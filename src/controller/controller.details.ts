//@ts-nocheck

import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'
import db from "../../models";
import { characters } from "../../seeders/characters";


//------------------------- http://localhost:3000/comics/id ----------------------------------


export const getDetails = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        let api
        if (id > 600){

            api = await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}/?api_key=${apiKey}&format=json`)
            const apiData = api.data.results 
            if(apiData){
                const comicDetail: (object) = {
                    id: apiData.id,
                    name: apiData.name,
                    // deck: apiData.deck?apiData.deck : apiData.name,
                    image: apiData.image.original_url,
                    publisher: apiData.publisher.name,
                    release_year: apiData.start_year,
                    episodes: apiData.issues.map((e: { name: any; id: any; issue_number: any; }) =>   {
                        return {
                            name: e.name,
                            id: e.id,
                            issue_Number: e.issue_number,
                            // image: e.api_detail_url
                          }
                        })
                    }
                res.send(comicDetail)

        } else throw "No se encontro ese comic"

    } else if (id<600){
          api = await db.Comics.findAll({
            include:[{
                model: db.Characters},
                {model: db.Concepts},
                ],

            where: {
                id: id
            }
        })
        console.log(api)
        let auxiliar = api.map(e => {
            return {

                name: e.name,
                image: e.image,
                description: e.description,
                release: e.release, 
                publisher: e.publisher,
                characters: e.Characters,
                episodes: e.episodes,

                concepts: e.Concepts
            }
        })
        res.send(auxiliar) 

        }
    } catch (e) {
        console.log(e);
    }
};