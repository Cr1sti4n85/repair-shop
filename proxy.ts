import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export default withAuth(async function proxy(request: NextRequest) {}, {
  isReturnToCurrentPage: true,
});

export const config = {
  /*
   Match all request paths except for requests starting with:
   - api
   - _next/static
   - _next/image
   - auth
   -favicon.ico
   - robots.txt
   - images
   - login
   - the root path ($)
  */
  matcher: [
    "/((?!api|_next/static|_next/image|auth|favicon.ico|robots.txt|images|login|$).*)",
  ],
};
