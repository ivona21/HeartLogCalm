/**
 * DEFAULT_HOME_ROUTE
 *
 * Determines which feature page renders at "/" (the app root).
 * After a successful login or registration, the user is always redirected to "/".
 *
 * To change the home feature:
 *   1. Update this constant to the desired route path (e.g. '/dashboard')
 *   2. Register the corresponding page component in src/shared/routing/HomeRoute.tsx
 *
 * The named route (e.g. /emotion-wheel) remains independently accessible at its own URL.
 */
export const DEFAULT_HOME_ROUTE = '/emotion-wheel';
