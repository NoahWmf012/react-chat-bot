export async function getChatbotResponse(facts: string[], question: string): Promise<string> {
   const apiKey = process.env.OPENAI_API_KEY;
   console.log("apiKey", apiKey);
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
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
    }),
  });

  const data = await res.json();
  console.log("data", data);
  return data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';
}