const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello api send-mail');
});

app.post('/send-email', async (req, res) => {
    const { senderEmail, recipientEmail, object, contentEmail } = req.body;

    if (!senderEmail || !recipientEmail || !object || !contentEmail) {
        return res.status(400).send({ error: 'Tous les champs sont requis' });
    }


    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    const mailOptions = {
        from: senderEmail,
        to: recipientEmail,
        subject: object,
        text: contentEmail
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email envoyé avec succès!' });
    } catch (error) {
        res.status(500).send({ error: 'Erreur lors de l\'envoi de l\'email' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'exécusion sur http://localhost:${PORT}`);
});