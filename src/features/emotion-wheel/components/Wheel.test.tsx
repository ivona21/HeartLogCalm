import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';
import { ApiErrorCode } from '@/shared/api/heartlog.generated';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  saveAuthenticatedEntryDraft,
  readAuthenticatedEntryDraft,
} from '@/features/emotion-wheel/stores/authenticatedEntryDraftStorage';
import { savePendingAuthEmotionSelection } from '@/features/emotion-wheel/stores/pendingAuthEmotionSelectionStorage';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/render';
import { server } from '@/test/msw/server';
import { Wheel } from './Wheel';

const authenticatedUser = {
  id: 'user-a',
  email: 'user-a@example.com',
};

const authenticatedSession = {
  accessToken: 'access-token',
  expiresAt: '2099-01-01T00:00:00.000Z',
  email: authenticatedUser.email,
};

const emotionsResponse = {
  success: true,
  data: [
    {
      id: 'joy',
      label: 'Joy',
      color: '#f8c94a',
      children: [],
    },
  ],
};

const entrySummaryResponse = {
  success: true,
  data: {
    totalEntries: 1,
    latestOccurredAt: null,
  },
};

function authenticateUser() {
  useAuthStore.setState({
    user: authenticatedUser,
    session: authenticatedSession,
    authStatus: 'authenticated',
  });
}

function resetAuthStore() {
  useAuthStore.setState({
    user: null,
    session: null,
    authStatus: 'anonymous',
  });
}

function useDefaultWheelHandlers() {
  server.use(
    http.get('http://localhost/api/emotions', () => HttpResponse.json(emotionsResponse)),
    http.get('http://localhost/api/emotion-entries/summary', () =>
      HttpResponse.json(entrySummaryResponse),
    ),
  );
}

async function openSaveDialogFromRestoredDraft(user: ReturnType<typeof userEvent.setup>) {
  await screen.findByRole('button', { name: /joy/i });
  await user.click(await screen.findByLabelText(/continue with selected emotions/i));
  await screen.findByRole('dialog');
}

describe('Wheel authenticated draft save behavior', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
    resetAuthStore();
  });

  it('clears the authenticated draft and current selection after a successful save', async () => {
    const user = userEvent.setup();
    const submittedEntries: unknown[] = [];

    authenticateUser();
    saveAuthenticatedEntryDraft(authenticatedUser.id, {
      emotionIds: ['joy'],
      comment: 'A private draft',
    });
    savePendingAuthEmotionSelection(['joy']);
    useDefaultWheelHandlers();
    server.use(
      http.post('http://localhost/api/emotion-entries', async ({ request }) => {
        submittedEntries.push(await request.json());

        return HttpResponse.json({
          success: true,
          message: 'Emotion entry saved.',
          data: {
            entryId: '11111111-1111-1111-1111-111111111111',
            comment: 'Saved reflection',
            occurredAt: '2026-09-15T10:00:00.000Z',
            createdAt: '2026-09-15T10:00:00.000Z',
            selectedEmotions: [{ emotionKey: 'joy', isPrimary: true }],
          },
        });
      }),
    );

    renderWithProviders(<Wheel />, { route: '/emotion-wheel' });

    await openSaveDialogFromRestoredDraft(user);
    await user.clear(screen.getByLabelText(/reflection/i));
    await user.type(screen.getByLabelText(/reflection/i), 'Saved reflection');
    await user.click(screen.getByRole('button', { name: /done/i }));

    await waitFor(() => {
      expect(readAuthenticatedEntryDraft(authenticatedUser.id)).toBeNull();
    });
    expect(screen.queryByLabelText(/continue with selected emotions/i)).not.toBeInTheDocument();
    expect(submittedEntries).toEqual([
      {
        emotionKeys: ['joy'],
        primaryEmotionKey: 'joy',
        comment: 'Saved reflection',
        occurredAt: null,
      },
    ]);
  });

  it('keeps the authenticated draft when save fails', async () => {
    const user = userEvent.setup();
    const draft = {
      emotionIds: ['joy'],
      comment: 'Do not lose this',
    };

    authenticateUser();
    saveAuthenticatedEntryDraft(authenticatedUser.id, draft);
    useDefaultWheelHandlers();
    server.use(
      http.post('http://localhost/api/emotion-entries', () =>
        HttpResponse.json(
          {
            code: ApiErrorCode.unauthorized,
            message: 'Session expired.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        ),
      ),
      http.post('http://localhost/api/auth/refresh', () =>
        HttpResponse.json(
          {
            code: ApiErrorCode.unauthorized,
            message: 'Session expired.',
            errors: null,
            traceId: null,
          },
          { status: 401 },
        ),
      ),
    );

    renderWithProviders(<Wheel />, { route: '/emotion-wheel' });

    await openSaveDialogFromRestoredDraft(user);
    await user.click(screen.getByRole('button', { name: /done/i }));

    await screen.findByRole('heading', { name: /save your emotions/i });
    expect(readAuthenticatedEntryDraft(authenticatedUser.id)).toEqual(draft);
  });
});
