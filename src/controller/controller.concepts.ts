import { Request, Response, NextFunction } from "express";
import db from "../../models";
import axios from 'axios';
require('dotenv').config();
const apiKey = process.env.API_KEY

export const getConcepts = async () => {
    try {
        const conc = await db.Concepts.findAll()
        if(!conc.length){
            const allConcepts: (object)[] = []
            let apidata = `https://comicvine.gamespot.com/api/concepts/?api_key=${apiKey}&format=json&limit=100`
            let concepts = await axios.get(apidata)
            concepts.data.results.map((char: any) => {
                return allConcepts.push({
                    name: char.name,

                })
            })
            await db.Concepts.bulkCreate(allConcepts)
        }
    } catch (e) {
        console.log(e);
    }
};
//------------------------------------------ http://localhost:3000/concepts --------------------------

export const getConceptssDB = async(req: Request, res: Response) =>{
    try {
        const allConcepts = await db.Concepts.findAll();
       const concepts = allConcepts.map((char: { id: any; name: any; description: any; image: any; }) => {
            return {
                id: char.id,
                name:char.name,
            }
        })
      res.send(concepts)
        
    } catch (error) {
        console.log(error)
    }
   
 }