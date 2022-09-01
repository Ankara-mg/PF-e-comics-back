import { Request, Response, NextFunction } from "express";
import db from "../../models";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getPublishers = async (req: Request, res: Response) => {
    try {
        const allPublishers: (object)[] = []
        let apidata = `https://comicvine.gamespot.com/api/publishers/?api_key=${apiKey}&format=json&limit=4`
        let publishers = await axios.get(apidata)
        publishers.data.results.map((char: any) => {

            return allPublishers.push({
              
            })
            
        })
        await db.Publishers.bulkCreate(allPublishers)
        res.send(allPublishers);
    } catch (e) {
        console.log(e);
    }
};