const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the root directory

app.post('/analyze', async (req, res) => {
    const userResponse = req.body.response; // This should now be a combined string of all inputs

    try {
        const requestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Summarize the following collection of texts." },
                { role: "user", content: userResponse }
            ]
        };

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        // Send back the summary result
        res.json({ result: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
