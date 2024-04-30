export const serverPublicRoutes = ["/server/explore", "/server/search"];

/**
 * Routes that can be accessed without logging in
 * @type {string[]}
 */
export const authRoutes = ["/welcome", "/login"];

/**
 * Prefix for API authentication routes.
 * Accessible to all users regardless of logged in status.
 * Used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path to redirect users that are logged in if they try to access public routes
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
