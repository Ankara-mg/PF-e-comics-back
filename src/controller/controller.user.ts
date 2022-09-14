import { Request, Response } from "express";
import db from "../../models";


export const postUser = async(req: Request, res: Response) => {
    const { name, username, email, picture} = req.body
    try {
        const exists = await db.Users.findOne({where: {email: email}});
        if (exists) return res.json({info :"Este email ya se encuentra registrado"}) 

        const newUser = await db.Users.findOrCreate({
            where:{
                username,
                name,
                email: email.toLowerCase(),
                picture,
            }
        })

        // res.status(200).send("usuario registrado con exito")

        // user.save(function (err) {
        //     return res.status(200).send({ token: service.createToken(user) });
        //   });
      ;
    } catch (error) {
        console.log(error)
    }
}
