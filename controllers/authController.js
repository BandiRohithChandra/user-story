const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// User Registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Password Reset Request
exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://yourapp.com/reset-password/${token}`;
    await nodemailer.sendMail({
      to: user.email,
      subject: 'Password Reset',
      text: `Use this link to reset your password: ${resetUrl}`,
    });

    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Password Reset
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get User Profile (Protected Route)
// exports.getProfile = async (req, res) => {
//     try {
//       const user = await User.findById(req.userId).select('-password');
//       if (!user) return res.status(404).json({ error: 'User not found' });
//       res.json(user);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };