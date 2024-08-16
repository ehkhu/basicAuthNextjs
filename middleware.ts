
export { auth as middleware } from "./auth";

const protectedRoutes = [
  '/',
  '/protect',
];

const unprotectedRoutes = ['/about', '/login'];
export const config = {
  // matcher: ["/((?!_next/static|_next/image|favicon.ico).*)",'/protect'],
  matcher: protectedRoutes,
};