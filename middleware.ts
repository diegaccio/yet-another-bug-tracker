import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./app/session/sessionUtils";

const publicRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!publicRoutes.includes(request.nextUrl.pathname)) {
    if (!session?.userId) {
      console.log("MIDDLEWARE unauthorized path: " + request.nextUrl.pathname);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    } else {
      console.log("MIDDLEWARE session: " + session);
      console.log(
        "MIDDLEWARE updateting session for userId: " + session?.userId
      );

      return await updateSession(request);
    }
  }
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
