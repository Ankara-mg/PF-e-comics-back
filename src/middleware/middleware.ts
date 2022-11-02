//@ts-nocheck
import { Request, Response, NextFunction } from "express";
import db from "../../models";

require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretUser = process.env.SESSION_SECRET_USER
const secretAdmin= process.env.SESSION_SECRET_ADMIN

export const verifyToken = async(req: Request, res: Response, NextFunction: any ) =>{
   try {
       const tokenAuth = req.get("Authorization");
       if(!tokenAuth){
           return res.status(401).json({
               auth: false,
               message: 'no hay token'
           })
          }
       const token = tokenAuth?.replace("Bearer ", "")
       const decoded =  jwt.verify(token, secretUser)
       req.userId = decoded.id
       const user = await db.Users.findByPk(req.userId, {password: 0})

       if(!user){
        return res.status(404).json("el usuario no existe")
       }

       NextFunction()
    
   } catch (error) {
     return error
   }
}


export const verifyTokenAdmin = async(req: Request, res: Response, NextFunction: any ) =>{
  try {
      const tokenadm = req.get['Authorization'];
      if(!tokenadm){
          return res.status(401).json({
              auth: false,
              message: 'no hay token'
          })
      }
      const token = tokenadm?.replace("Bearer ", "")
      const decoded =  jwt.verify(token, secretAdmin)
      req.userId = decoded.id
      const user = await db.Users.findByPk(req.userId, {password: 0})

      if(!user){
       return res.status(404).json("el usuario no existe")
      }

      NextFunction()
   
  } catch (error) {
    return error
  }
}



// export const isAdmin = async (req: Request, res: Response, NextFunction: any ) => {
//     try {
//       const user = await db.Users.findById(req.userId);
//         if (user.rol === "ADMIN") {
//           NextFunction();
//           return; 
//       }
//         return res.status(403).send("permiso de administrador es requerido");
//     } catch (error) {
//         console.log(error);
//         return error
//     }
//   };
