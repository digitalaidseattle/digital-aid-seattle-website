// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export function POST(request: Request) {
  return new Response(`Hello from ${request.body}`);
}