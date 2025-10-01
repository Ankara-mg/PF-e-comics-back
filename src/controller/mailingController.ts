import { transporter } from '../services/mail';
const { MAILER_EMAIL } = process.env;

// 👻
export const sendEmail = async (email: string[]) => {
  const mailHtml = `
    <div>
      <h1>e-comics</h1>
      <p>Enjoy your comic!</p>
      <b>Come back soon.</b>
    </div>
  `

  try {
    const mailInfo = await transporter.sendMail({
      from: MAILER_EMAIL,
      to: [...email],
      subject: 'Thanks for your purchase.',
      html: mailHtml,
    });

    return mailInfo;
  } catch (error: any) {
    throw new Error('The email could not be sent.' + error.message);
  };
};
