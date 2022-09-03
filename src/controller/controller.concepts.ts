import { Request, Response, NextFunction } from "express";
import db from "../../models";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getConcepts = async () => {
    try {
        const conc = await db.Concepts.findAll()
        if(!conc.length){
            const allConcepts: (object)[] = []
            let apidata = `https://comicvine.gamespot.com/api/concepts/?api_key=${apiKey}&format=json&limit=10`
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


export const getConceptssDB = async(req: Request, res: Response) =>{
    try {
        const allConcepts = await db.Concepts.findAll();
       
        const concepts = allConcepts.map((char: { id: any; name: any; description: any; image: any; }) => {
            return {
                id: char.id,
                name:char.name,
                image: char.image
    
            }
        })
      //  return publishers
      res.send(concepts)
        
    } catch (error) {
        console.log(error)
    }
   
 }