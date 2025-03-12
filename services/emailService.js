const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetEmail = async (to, resetUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `Use this link to reset your password: ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };