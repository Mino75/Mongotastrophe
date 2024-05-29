const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const app = express();
const PORT = process.env.API_PORT || 3000;
const mongoUrl = process.env.MONGO_URL;
const endpoint = process.env.ENDPOINT || '/requestcommand';
const basicAuthUser = process.env.BASIC_AUTH_USER;
const basicAuthPassword = process.env.BASIC_AUTH_PASSWORD;

if (!mongoUrl || !basicAuthUser || !basicAuthPassword) {
    console.error('Missing required environment variables');
    process.exit(1);
}

// Middleware for basic authentication
app.use(basicAuth({
    users: { [basicAuthUser]: basicAuthPassword },
    challenge: true
}));

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Endpoint to run MongoDB commands
app.post(endpoint, async (req, res) => {
    const command = req.body.command;

    if (!command) {
        return res.status(400).json({ error: 'command is required' });
    }

    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        
        const result = await mongoose.connection.db.command(command);
        mongoose.connection.close();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error running command', details: error.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
