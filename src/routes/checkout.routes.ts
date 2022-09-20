import e, { Request, Response } from "express";
const { Router } = require('express')
const Stripe = require('stripe')
require("dotenv")

const router = Router()
const { STRIPE_KEY } = process.env
const stripe = new Stripe(STRIPE_KEY)

router.post('/', async (req: Request, res: Response) => {

    try {        
        let { id, price, carrito } = req.body
        price = price.toFixed(2) * 100
    
        //findOne(email)
        const payment = await stripe.paymentIntents.create({
            amount: price, // Amount es el precio, no mandar como price
            currency: "COP",
            description: "comic", 
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