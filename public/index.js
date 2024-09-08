const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(bodyParser.urlencoded({ extended: false }));

// Configure your email transporter (replace with your credentials)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'amadasunese@gmail.com',
        pass: 'qxxo axga dzia jjsw'
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Validate data (optional)

    const mailOptions = {
        from: 'amadasunese@gmail.com',
        to: 'amadasunese@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ message: 'An error occurred while sending your message. Please try again later.' });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Your message has been sent successfully!' });
        }
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));