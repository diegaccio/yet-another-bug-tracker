import { SignJWT, jwtVerify } from "jose";
import ms from "ms";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
const expirationTime = "10s";

export type Session = { userId: number; userName: string; expires?: Date };

export async function encrypt(payload: Session) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(key);
}

export async function decrypt(input: string): Promise<Session> {
  const { payload } = await jwtVerify<Session>(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createNewSession(data: Session) {
  // Verify credentials && get the user

  // Create the session
  data.expires = new Date(Date.now() + ms(expirationTime));
  const session = await encrypt(data);

  // Save the session in a cookie
  (await cookies()).set("session", session, {
    expires: data.expires,
    httpOnly: true,
  });
}

export async function deleteSession() {
  // Destroy the session
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
