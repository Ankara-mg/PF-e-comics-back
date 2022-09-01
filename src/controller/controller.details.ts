//@ts-nocheck

import { Request, Response, NextFunction } from "express";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getDetails = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        let api = await axios.get(`https://comicvine.gamespot.com/api/series/4075-${id}/?api_key=${apiKey}&format=json`)

        const apiData = api.data.results

        if(apiData.length > 0){
            
            const comicDetail: (object) = {
                id: apiData.id,
                name: apiData.name,
                deck: apiData.deck?apiData.deck : apiData.name,
                episodes: apiData.episodes.map(e => e.name),
                image: apiData.image.original_url,
                publisher: apiData.publisher.name,
                release_year: apiData.start_year,
            }

            res.send(comicDetail)

        } else throw "No se encontro ese comic"

    } catch (e) {
        res.send(e);
    }
};