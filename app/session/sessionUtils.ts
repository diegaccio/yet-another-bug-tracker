import { SignJWT, jwtVerify } from "jose";
import ms from "ms";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
const expirationTime = "10m";

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

function getNewExpiryTime() {
  return new Date(Date.now() + ms(expirationTime));
}

export async function createNewSession(data: Session) {
  // Create the session
  data.expires = getNewExpiryTime();
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
  console.log("SESSION: starting getSession...");
  const session = (await cookies()).get("session")?.value;
  console.log("SESSION: cookies fetched", session);
  if (!session) {
    console.log("SESSION: no session found");
    return null;
  }

  const decryptedSession = await decrypt(session);
  console.log("SESSION: session decrypted", decryptedSession);
  return decryptedSession;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = getNewExpiryTime();
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function updateSessionFromServerAction() {
  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = getNewExpiryTime();

  cookieStore.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return parsed;
}

export async function resetSession(response: NextResponse) {
  response.cookies.set({
    name: "session",
    value: "",
  });
  return response;
}
