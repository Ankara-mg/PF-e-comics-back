import { Request, Response } from "express";
const { Router } = require('express')
const Stripe = require('stripe')
require("dotenv")

const router = Router()
const { STRIPE_KEY } = process.env
const stripe = new Stripe(STRIPE_KEY)

router.post('/', async (req: Request, res: Response) => {

    try {
        const { id, price, mailUsuario } = req.body
    
        //findOne(email)
        const payment = await stripe.paymentIntents.create({
            amount: price, // Amount es el precio, no mandar como price
            currency: "USD",
            description: "comic", // ACA PASARLE EL NOMBRE DEL COMIC!!
            payment_method: id,
            confirm: true,
            // El email del usuario para que reciba el detalle
            //receipt_email: mailUsuario, 
            //customer: idUsuario,
        })
    
        res.send("Disfrute de su comic :)")
    } catch (error: any) {
        res.status(418).json({error: error.raw.message})
    }
})

export default router