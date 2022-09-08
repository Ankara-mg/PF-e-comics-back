//@ts-nocheck
import { Request, Response } from "express";
import db from "../../models";
import router from "../routes";
require('dotenv').config()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.SESSION_SECRET

//---------------------------------http://localhost:3000/user/singup---------------------------------------------------

export const userSignup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    const rondasDeSal = 10;
    try {
        const exists = await db.Users.findOne({ where: { email: email } });
        if (exists) return res.json({ info: "Este email ya se encuentra registrado" })
        const newUser = await db.Users.create({
            username: username,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, rondasDeSal)
        })
    const user = await db.Users.findOne({ where: { email: email } })
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 * 24 })
    res.status(200).send({ auth: true, token })
            ;
    } catch (error) {
        console.log(error)
    }
}

//---------------------------------http://localhost:3000/user/login------------------------------------------------

export const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await db.Users.findOne({
            where: {
                email: email.toLowerCase()
            }
        })
        if (!user) {
            return res.status(404).send("El email no esta registrado");
        }
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            res.status(401).json({ auth: false, token: null })
        }
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 * 24 })
        console.log(token)
        res.json({ auth: true, token })

    } catch (error) {
        console.log(error)
    }
}

//----------------------------------------------------------------------------------------------------------------------

// export const verificar =  async(req: Request, res: Response)=>{
//     const user = await db.Users.findByPk(req.userId, {password: 0});
//     console.log(user)
//     if(!user){
//         return res.status(404).send("no se encuentra el usuario")
//     }
//     res.send(user)
// }
