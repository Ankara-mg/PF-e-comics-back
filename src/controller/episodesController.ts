import axios from "axios"
import { Request, Response } from "express";
import db from "../../models";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getComics = async (req: Request, res: Response) => {
    try {
        const comics: (object)[] = []
        let listSeries = `https://comicvine.gamespot.com/api/series_list/?api_key=${apiKey}&format=json`
        let dataList = await axios.get(listSeries)
        // console.log(dataList)
        dataList.data.results.map((e: any) => {
            return comics.push({
                name: e.name,
                id: e.id,
                image: e.image.original_url,
                description: e.deck,
                release: e.date_added.slice(' '),
                episodes: e.count_of_episodes
            })
        })
        await db.Comics.bulkCreate(comics)
        res.send(comics)
    //    return comics
    } catch (error) {
        console.log(error)
    }
}