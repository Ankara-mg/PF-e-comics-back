
require('dotenv').config();
// import axios from "axios"
// import db from "../../models";
// import { Op } from 'sequelize'
// const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'
const { transporter } = require("../../config/mail.js")

console.log("TRANSPORTER,", transporter)


//----------------------------- http://localhost:3000/comics -----------------------------------
// 👻
export const sendMailService = async (email: string[]) => {
  console.log("TRANSPORTER en funcion", transporter)
  let info = await transporter.sendMail({
    from: 'ecomicsPF@gmail.com', // sender address
    to: [...email], // list of receivers
    subject: "Gracias por su compra.", // Subject line
    html: `
    <div>
    <h1>Ecomics</h1>
    <p>Disfrute su comic!</p>
    <b>Vuelva Pronto</b>
    </div>
    `, // html body
  });

  if (info) {
    return info
  } else {
    throw new Error("The email could not be sent");
  }

}

