export async function getChatbotResponse(facts: string[], question: string): Promise<string> {
  const res  = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ facts, question })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}