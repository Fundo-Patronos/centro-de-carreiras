export async function GET() {
    const apiUrl = process.env.API_URL;
    
    return new Response(JSON.stringify({ apiUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }