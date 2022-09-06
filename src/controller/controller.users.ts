import axios from "axios"
import { Request, Response } from "express";
import { where } from "sequelize/types";
import db from "../../models";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'




export const userSignup = async(req: Request, res: Response) => {
    const { username, email, address, password} = req.body
    try {
        const exists = await db.Users.findOne({where: {email: email}});
        if (exists) return res.json({info :"Este email ya se encuentra registrado"}) 
        
        const newUser = await db.Users.findOrCreate({
            where:{
                username: username.charAt(0).toUpperCase(),
                email: email.toLowerCase() ,
                address, 
                password
            }
        })

        res.status(200).send("usuario registrado con exito")

        // user.save(function (err) {
        //     return res.status(200).send({ token: service.createToken(user) });
        //   });
      ;
    } catch (error) {
        console.log(error)
    }
}



export const userLogin = async(req: Request, res: Response) =>{
        const {email, password} = req.body
    try {
        const userEmail =   db.Users.findOne({
            where: {
                email: email.toLowerCase(),
                password: password   
            }
        })
        if(userEmail){
            //return res.status(200).send({ token: service.createToken(user) });
        } 


        
    } catch (error) {
        console.log(error)
    }
}





