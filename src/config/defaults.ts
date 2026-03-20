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

/**
 * DEFAULT_WHEEL_DISPLAY_MODE
 *
 * Controls how the emotion wheel renders and responds to interaction.
 *
 * - 'full': All three rings (core, secondary, tertiary) visible simultaneously.
 *   Clicking any ring adds/removes from multi-select set.
 *
 * - 'progressive': Progressive drill-down experience.
 *   Click core → shows its secondaries. Click secondary → shows its tertiaries.
 *   Only tertiary clicks add to the selection set. Click active segment to go back.
 *
 * In the future, this will be configurable by users in their app settings.
 */
export type WheelDisplayMode = 'full' | 'progressive';
export const DEFAULT_WHEEL_DISPLAY_MODE: WheelDisplayMode = 'full';
