import type { AuthSession } from '@/features/auth/types/auth-session.ts';
import type { User } from '@/features/auth/types/user.ts';
import type {
  BackendCoreEmotion,
  BackendSecondaryEmotion,
  BackendTertiaryEmotion,
} from '@/features/emotion-wheel/types/backend-emotion.ts';
import type { EmotionEntrySummary } from '@/features/emotion-wheel/types/emotion-entry-summary.ts';
import type {
  AuthSessionResponseDtoApiResponse,
  EmotionEntriesSummaryResponseApiResponse,
  EmotionTreeNodeDto,
  EmotionTreeNodeDtoIEnumerableApiResponse,
  UserMeResponseDto,
  UserMeResponseDtoApiResponse,
} from '@/shared/api/heartlog.generated.ts';

function requireValue<T>(value: T | null | undefined, field: string): T {
  if (value === null || value === undefined || value === '') {
    throw new Error(`Missing ${field}.`);
  }

  return value;
}

export function assertApiSuccess(response: { success?: boolean; message?: string }) {
  if (response.success !== true) {
    throw new Error(response.message || 'Request failed.');
  }
}

export function unwrapApiData<T>(response: { success?: boolean; message?: string; data?: T | null }) {
  assertApiSuccess(response);

  if (response.data === null || response.data === undefined) {
    throw new Error(response.message || 'Missing response data.');
  }

  return response.data;
}

export function toAuthSession(
  response: AuthSessionResponseDtoApiResponse,
): AuthSession {
  const data = unwrapApiData(response);

  return {
    accessToken: requireValue(data.accessToken, 'access token'),
    expiresAt: requireValue(data.expiresAt, 'expires at'),
    email: requireValue(data.email, 'email'),
  };
}

export function mapUserDto(data: UserMeResponseDto): User {
  return {
    id: data.id ?? undefined,
    username: data.username ?? undefined,
    email: requireValue(data.email, 'email'),
  };
}

export function toUser(response: UserMeResponseDtoApiResponse | UserMeResponseDto): User {
  if ('success' in response || 'message' in response) {
    return mapUserDto(unwrapApiData(response));
  }

  return mapUserDto(response);
}

export function toEmotionEntrySummary(
  response: EmotionEntriesSummaryResponseApiResponse,
): EmotionEntrySummary {
  const data = unwrapApiData(response);

  return {
    totalEntries: data.totalEntries ?? 0,
    latestOccurredAt: data.latestOccurredAt ?? null,
  };
}

function toTertiaryEmotion(node: EmotionTreeNodeDto): BackendTertiaryEmotion {
  return {
    id: requireValue(node.id, 'emotion id'),
    label: requireValue(node.label, 'emotion label'),
  };
}

function toSecondaryEmotion(node: EmotionTreeNodeDto): BackendSecondaryEmotion {
  return {
    id: requireValue(node.id, 'emotion id'),
    label: requireValue(node.label, 'emotion label'),
    children: (node.children ?? []).map(toTertiaryEmotion),
  };
}

function toCoreEmotion(node: EmotionTreeNodeDto): BackendCoreEmotion {
  return {
    id: requireValue(node.id, 'emotion id'),
    label: requireValue(node.label, 'emotion label'),
    color: requireValue(node.color, 'emotion color'),
    children: (node.children ?? []).map(toSecondaryEmotion),
  };
}

export function toCoreEmotions(
  response: EmotionTreeNodeDtoIEnumerableApiResponse,
): BackendCoreEmotion[] {
  const data = unwrapApiData(response);
  return data.map(toCoreEmotion);
}
