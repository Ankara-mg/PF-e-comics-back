require('dotenv').config();
const nodemailer = require("nodemailer");
const { email, adminApi } = process.env

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: email,
    pass: adminApi,
  },
});

module.exports = transporter