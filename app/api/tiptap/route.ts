export async function GET() {
  const authorization = process.env.NEXT_PUBLIC_TIPTAP_API_SECRET;
  if (!authorization) {
    throw new Error("Authorization token is not defined");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: authorization,
  };

  try {
    const res = await fetch(
      "https://7meldg9y.collab.tiptap.cloud/api/documents",
      {
        headers,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }
}
