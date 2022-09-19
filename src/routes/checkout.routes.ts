import e, { Request, Response } from "express";
const { Router } = require('express')
const Stripe = require('stripe')
require("dotenv")

const router = Router()
const { STRIPE_KEY } = process.env
const stripe = new Stripe(STRIPE_KEY)

router.post('/', async (req: Request, res: Response) => {
    let { id, price, carrito } = req.body

    try {
        price = price.toFixed(2) * 100

        //findOne(email)
        const payment = await stripe.paymentIntents.create({

            amount: price, // Amount es el precio, no mandar como price
            currency: "USD",
            description: "comic", // ACA PASARLE EL NOMBRE DEL COMIC!!
            payment_method: "pm_card_visa",
            confirm: true,
            // El email del usuario para que reciba el detalle
            //receipt_email: mailUsuario, 
            //customer: idUsuario,
        })
        console.log(payment);

        res.send(payment)
    } catch (error: any) {
        res.status(418).json({ error: error.raw.message })
    }
})

export default router