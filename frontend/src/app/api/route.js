export async function GET() {
  const apiUrl = process.env.NODE_ENV === "production" ? "https://backend-app-722033123279.us-central1.run.app" : "http://localhost:8000";
  
  return new Response(JSON.stringify({ apiUrl }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}