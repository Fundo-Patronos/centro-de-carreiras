export async function GET() {
  const apiUrl = "https://patronos-centro-de-carreiras-backend-722033123279.us-central1.run.app";
  
  return new Response(JSON.stringify({ apiUrl }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}