export async function getChatbotResponse(facts: string[], question: string): Promise<string> {
  const messages = [
    {
      role: 'system',
      content: 'You are a helpful assistant. Only answer based on the provided facts, and cite them.',
    },
    {
      role: 'user',
      content: 'Here are the facts:\n' + facts.map((f, i) => (i + 1) + '. ' + f).join('\n') + '\n\nQuestion: ' + question,
    },
  ];

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}