const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { facts, question } = req.body;

    const messages = [
        { role: 'system', content: 'You are a helpful assistant. Only answer based on the provided facts, and cite them.' },
        { role: 'user', content: `Facts:\n${facts.join('\n')}\n\nQuestion: ${question}` }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini',
            messages,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Something went wrong.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
