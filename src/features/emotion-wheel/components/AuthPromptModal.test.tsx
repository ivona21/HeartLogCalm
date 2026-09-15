import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/render';
import { readPendingAuthEmotionSelection } from '@/features/emotion-wheel/stores/pendingAuthEmotionSelectionStorage';
import { AuthPromptModal } from './AuthPromptModal';

describe('AuthPromptModal', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('creates pending auth handoff state when a guest continues to registration', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AuthPromptModal open selectionOrder={['joy', 'joy.content']} onClose={() => undefined} />,
      { route: '/emotion-wheel' },
    );

    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(readPendingAuthEmotionSelection()).toMatchObject({
      emotionIds: ['joy', 'joy.content'],
    });
  });
});
