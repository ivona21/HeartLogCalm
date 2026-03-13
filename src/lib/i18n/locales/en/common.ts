import type { TranslationMap } from '@/lib/i18n/types.ts';

const common: TranslationMap = {
  'nav.dashboard': 'Dashboard',
  'nav.emotionWheel': 'Emotion Wheel',
  'nav.journal': 'Journal',
  'nav.profile': 'Profile',
  'nav.settings': 'Settings',

  'auth.signIn': 'Sign In',
  'auth.signOut': 'Sign Out',
  'auth.register': 'Create Account',
  'auth.emailLabel': 'Email',
  'auth.usernameLabel': 'Username',
  'auth.passwordLabel': 'Password',
  'auth.emailPlaceholder': 'you@example.com',
  'auth.usernamePlaceholder': 'your username',
  'auth.passwordPlaceholder': 'your password',
  'auth.noAccount': "Don't have an account?",
  'auth.hasAccount': 'Already have an account?',

  'action.save': 'Save',
  'action.cancel': 'Cancel',
  'action.continue': 'Continue',
  'action.back': 'Back',
  'action.delete': 'Delete',
  'action.edit': 'Edit',
  'action.confirm': 'Confirm',
  'action.close': 'Close',
  'action.submit': 'Submit',

  'error.generic': 'Something went wrong. Please try again.',
  'error.network': 'Network error. Please check your connection.',
  'error.unauthorized': 'You are not authorized to view this page.',
  'error.notFound': 'Page not found.',

  'status.loading': 'Loading...',
  'status.saving': 'Saving...',
};

export default common;
