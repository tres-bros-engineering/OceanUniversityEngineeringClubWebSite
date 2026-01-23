const nodemailer = require("nodemailer");

require('dotenv').config();

const app_host = process.env.EMAIL_APP_HOST;
const app_email = process.env.EMAIL_APP_EMAIL;
const app_password = process.env.EMAIL_APP_PASSWORD;

// Create a transporter using Gmail.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: app_host,
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: app_email,
    pass: app_password,
  },
});

// Send an email using async/await
const sendMail = async (to, subject, message) => {
    try {
        await transporter.sendMail({
            from: '"Ocean University Engineering Club" <reptilianpodcast@gmail.com>',
            to: to,
            subject: subject,
            html: message, // HTML version of the message
        })
        console.log("Email sent successfully.");
    } catch (error) {
        console.log("Email not sent! Internal Server Error.");
    }
};

exports.sendMail = sendMail;