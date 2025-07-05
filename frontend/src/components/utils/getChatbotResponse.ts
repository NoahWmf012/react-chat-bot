export async function getChatbotResponse(facts: string[], question: string): Promise<string> {
  const res  = await fetch(`http://localhost:${process.env.SERVER_PORT}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ facts, question })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}