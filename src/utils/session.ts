import { cookies } from "next/headers";

/**
 * Duration of one day in milliseconds.
 * Used to set the cookie expiration time.
 */
const oneDay = 1 * 24 * 60 * 60 * 1000;

/**
 * Creates a secure HTTP-only session cookie with a 1-day expiration.
 *
 * This function sets a `token` cookie on the server using the `cookies()` API,
 * ensuring it's only accessible via HTTP requests (not JavaScript).
 *
 * @param token - The session token to be stored in the cookie.
 *
 * @example
 * await createSession("some-jwt-token");
 */
export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + oneDay);
  (await cookies()).set("token", token, {
    expires: expiresAt, 
    httpOnly: true, 
    secure: true, 
    path: "/", 
  });
}

/**
 * Deletes the session cookie (`token`) from the browser.
 *
 * This function removes the `token` cookie using the `cookies()` API.
 * Commonly used during logout to invalidate the session.
 *
 * @example
 * await deleteSession();
 */
export async function deleteSession() {
  (await cookies()).delete("token");
}
