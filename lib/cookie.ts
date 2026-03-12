/**
 * Cookie utility service for client-side cookie operations.
 */

/**
 * Retrieves the value of a cookie by name.
 * Returns `null` if running on the server (SSR) or if the cookie is not found.
 *
 * @param name - The name of the cookie to retrieve.
 * @returns The decoded cookie value, or `null` if not found.
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
