import { cookies } from "next/headers";

const oneDay = 1 * 24 * 60 * 60 * 1000

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + oneDay);
  (await cookies()).set("token", token, {
    expires: expiresAt, 
    httpOnly: true, 
    secure: true, 
    path: "/" 
  })

}

export async function deleteSession() {
  (await cookies()).delete("token");
}
