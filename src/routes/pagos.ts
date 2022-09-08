import { Request, Response } from "express";
const { Router } = require('express')
const Stripe = require('stripe')
require("dotenv")

const router = Router()
const { STRIPE_KEY } = process.env
const stripe = new Stripe(STRIPE_KEY)

router.post('/', async (req: Request, res: Response) => {
    
    try {
        const { id, price } = req.body
        console.log(id,"hola 12")
        
        const payment = await stripe.paymentIntents.create({
            amount: price, // Amount es el precio, no mandar como precio :(
                currency: "USD",
                description: "comic", // ACA PASARLE EL NOMBRE DEL COMIC!!
                payment_method: id,
                confirm: true,
            })
            
            res.send("Disfrute de su comic :)")
        } catch (error: any) {
            res.status(404).json({error: error.raw.message})
         
    }
})

export default router