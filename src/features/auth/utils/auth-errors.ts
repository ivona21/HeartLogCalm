export function isUnconfirmedAccountLoginError(message?: string | null): boolean {
  if (!message) {
    return false;
  }

  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes('invalid') && normalizedMessage.includes('credential')) {
    return false;
  }

  return (
    normalizedMessage.includes('confirm') ||
    normalizedMessage.includes('verified') ||
    normalizedMessage.includes('unconfirmed')
  );
}

export function isInvalidCredentialsLoginError(message?: string | null): boolean {
  if (!message) {
    return false;
  }

  const normalizedMessage = message.toLowerCase();

  return normalizedMessage.includes('invalid') && normalizedMessage.includes('credential');
}
