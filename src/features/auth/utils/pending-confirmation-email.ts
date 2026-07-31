const PENDING_CONFIRMATION_EMAIL_KEY = 'heartlog_pending_confirmation_email';

export function setPendingConfirmationEmail(email: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(PENDING_CONFIRMATION_EMAIL_KEY, email);
}

export function getPendingConfirmationEmail() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.sessionStorage.getItem(PENDING_CONFIRMATION_EMAIL_KEY);
}

export function clearPendingConfirmationEmail() {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.removeItem(PENDING_CONFIRMATION_EMAIL_KEY);
}
