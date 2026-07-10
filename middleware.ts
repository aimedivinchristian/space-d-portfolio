export { default } from 'next-auth/middleware';

// Protect every /admin route except the login page itself.
export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
