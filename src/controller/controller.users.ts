//@ts-nocheck
import { Request, Response } from "express";
import db from "../../models";
import router from "../routes";
require('dotenv').config()


const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretUser = process.env.SESSION_SECRET_USER
const secretAdmin= process.env.SESSION_SECRET_ADMIN
//---------------------------------http://localhost:3000/user/singup---------------------------------------------------

export const userSignup = async (req: Request, res: Response) => {
    const { username, email, password, } = req.body
    const rondasDeSal = 10;
    try {
        const exists = await db.Users.findOne({ where: { email: email } });
        if (exists) return res.json({ info: "Este email ya se encuentra registrado" })
        const newUser = await db.Users.create({
            username: username,
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, rondasDeSal),
            rol: "USER"
        })

    const user = await db.Users.findOne({ where: { email: email } })
    const token = jwt.sign({ id: user.id }, secretUser, { expiresIn: 60 * 60 * 24 })
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
            res.status(401).json({ auth: false, token: null, message: "contraseña incorrecta" })
        }
        if (user.rol === "ADMIN"){
            const token = jwt.sign({ id: user.id }, secretAdmin, { expiresIn: 60 * 60 * 24 })
            res.json({ auth: true, token, Rol: "ADMIN", name: user.username })
        }
        if (user.rol === "USER"){
            const token = jwt.sign({ id: user.id }, secretUser, { expiresIn: 60 * 60 * 24 })
            res.json({ auth: true, token, Rol: "USER", name: user.username, id: user.id})
        }
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
