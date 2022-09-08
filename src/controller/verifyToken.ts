//@ts-nocheck
import { Request, Response, NextFunction } from "express";
require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.SESSION_SECRET

export const verifyToken = (req: Request, res: Response, NextFunction: any ) =>{
    const token = req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'no hay token'
        })
    }
    const decoded =  jwt.verify(token, secret)
    req.userId = decoded.id
    NextFunction()
}


