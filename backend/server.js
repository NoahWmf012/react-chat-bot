const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { facts, question } = req.body;

    const messages = [
        { role: 'system', content: 'You are a helpful assistant. Only answer based on the provided facts, and cite them.' },
        { role: 'user', content: `Facts:\n${facts.join('\n')}\n\nQuestion: ${question}` }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Send OpenAI response back to frontend
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
