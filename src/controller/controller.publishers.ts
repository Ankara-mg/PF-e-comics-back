import { Request, Response, NextFunction } from "express";
import db from "../../models";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

//export const getPublishers = async (req: Request, res: Response) => {
    export const getPublishers = async () => { 
    try {
    const pub = await db.Publishers.findAll()
    if(!pub.length){
        const allPublishers: (object)[] = []
        let apidata = `https://comicvine.gamespot.com/api/publishers/?api_key=${apiKey}&format=json&limit=20`
        let publishers = await axios.get(apidata)
        publishers.data.results.map((char: any) => {

            return allPublishers.push({
                id: char.name,
                name: char.name,
                image: char.image.original_url,
                city: char.location_city

            })
        })
        await db.Publishers.bulkCreate(allPublishers)

    }
    } catch (e) {
        console.log(e);
    }
}; 

export const getpublishersDB = async(req: Request, res: Response) =>{
    try {
        const allPublishers = await db.Publishers.findAll();
        const publishers = allPublishers.map((char: { id: any; name: any; description: any; image: any; }) => {
            return {

                id: char.name,
                name:char.name,
                description: char.description,
                image: char.image
    
            }
        })
      res.send(publishers)
        
    } catch (error) {
        console.log(error)
    }
   
 }
