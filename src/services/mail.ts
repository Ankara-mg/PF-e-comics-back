import nodemailer from "nodemailer";

const { MAILER_EMAIL, MAILER_PASSWORD } = process.env

const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});

export { transporter };