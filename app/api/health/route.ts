export function GET() {
  return Response.json(
    { status: "ok", service: "jumbos-hamburgers-tulsa", checkedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
