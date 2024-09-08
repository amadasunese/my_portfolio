const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port 3000

// Configure body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Define email transporter configuration (replace with your credentials)
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port
  secure: false, // Adjust based on your server configuration
  auth: {
    user: 'amadasunese@gmail.com', // Replace with your email address
    pass: 'qxxo axga dzia jjsw' // Replace with your email password
  }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Validate data (optional)

  const mailOptions = {
    from: 'amadasunese@gmail.com', // Replace with your email address
    to: 'amadasunese@gmail.com', // Replace with recipient email address
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));