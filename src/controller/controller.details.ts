//@ts-nocheck

import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import db from "../../models";
import { characters } from "../../seeders/characters";

require('dotenv').config();
const apiKey = process.env.API_KEY


//------------------------- http://localhost:3000/comics/id ----------------------------------


export const getDetails = async (id: string) => {
    if (id > 600) {
        id = Number(id)
        const api = await axios.get(`https://comicvine.gamespot.com/api/volume/4050-${id}/?api_key=${apiKey}&format=json`)
        const apiData = api.data.results

        if (Object.entries(apiData).length > 0) {
            const comicDetail: (object) = {
                id: apiData.id,
                name: apiData.name,
                description: apiData.description,
                image: apiData.image.original_url,
                publisher: apiData.publisher.name,
                start_year: apiData.start_year,
                count_of_issues: apiData.count_of_issues,
                episodes: apiData.issues.map((e: { name: any; id: any; issue_number: any; }) => {
                    return {
                        name: e.name,
                        id: e.id,
                        issue_Number: e.issue_number,
                        // image: e.api_detail_url
                    }
                })
            }
            return (comicDetail)

        } else return ([])

    } else if (id < 600) {
        const comic_db = await db.Comics.findOne({
            where: {
                id: id
            }
        })
        return (Object.entries(comic_db).length > 0 ? comic_db : {})
    }
};