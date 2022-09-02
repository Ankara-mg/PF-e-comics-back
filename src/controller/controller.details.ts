//@ts-nocheck

import { Request, Response, NextFunction } from "express";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getDetails = async (req: Request, res: Response) => {

    const { id } = req.params
    try {
        let api = await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}/?api_key=${apiKey}&format=json`)
        const apiData = api.data.results 
        if(apiData){
            const comicDetail: (object) = {
                id: apiData.id,
                name: apiData.name,
                // deck: apiData.deck?apiData.deck : apiData.name,
                image: apiData.image.original_url,
                publisher: apiData.publisher.name,
                release_year: apiData.start_year,
                episodes: apiData.issues.map(e =>   {
                    return {
                        name: e.name,
                        id: e.id,
                        issue_Number: e.issue_number,
                        // image: e.api_detail_url
                    }
                }),
            }
            res.send(comicDetail)

        } else throw "No se encontro ese comic"

    } catch (e) {
        res.send(e);
    }
};