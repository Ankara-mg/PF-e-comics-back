//@ts-nocheck
// import { Request, Response } from "express";
import db from "../../models";
import router from "../routes";
require('dotenv').config()
import { OAuth2Client  } from "google-auth-library";
import { User } from "oidc-client";
import { ClientRequest } from "http";
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const secretUser = process.env.SESSION_SECRET_USER
const secretAdmin = process.env.SESSION_SECRET_ADMIN
//---------------------------------http://localhost:3000/user/singup---------------------------------------------------

export const userSignup = async (username, email, password) => {
    const n_salt = 10;
    const exists = await db.Users.findOne({ where: { email: email } });
    if (exists) throw new Error("Este email ya se encuentra registrado")
    const newUser = await db.Users.create({
        username: username,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, n_salt),
        rol: "USER"
    })

    if (newUser) {
        return { msg: "Nuevo usuario registrado", newUser }
    } else {
        throw new Error("Error al crear el usuario")
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
        if (user.rol === "ADMIN") {
            const token = jwt.sign({ id: user.id }, secretAdmin, { expiresIn: 60 * 60 * 24 })
            res.json({ auth: true, token, Rol: "ADMIN", name: user.username })
        }
        if (user.rol === "USER") {
            const token = jwt.sign({ id: user.id }, secretUser, { expiresIn: 60 * 60 * 24 })
            res.json({ auth: true, token, Rol: "USER", name: user.username, id: user.id, email: user.email })
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


// ------------------------------------------------------------------------------

export const loginGoogle = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const {google} = req.body
        const authClient = new OAuth2Client("73480857070-b1pmolqom7futp18ta7mjgf3naq9lk27.apps.googleusercontent.com") 
        const client = await authClient.verifyIdToken({
            idToken: google, 
            audience: "73480857070-b1pmolqom7futp18ta7mjgf3naq9lk27.apps.googleusercontent.com"
        }) 
        
        const user = await db.Users.findOrCreate({
            where: {
                email: client.payload.email, 
                username: client.payload.name,
                password: "123456",
                rol: "USER"
            }
        })
        const user2 = await db.Users.findOne({
            where:{
                email: client.payload.email
            }
        })
        const token = jwt.sign({ id: user2.id }, secretUser, { expiresIn: 60 * 60 * 24 })
        res.json({ auth: true, token, Rol: "USER", name: user2.username, id: user2.id})
    } catch (error) {
        console.log(error)
    }

}
