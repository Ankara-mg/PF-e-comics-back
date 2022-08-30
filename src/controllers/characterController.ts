//import { Request, Response } from 'express';
// import { pool } from '../database';
//import { QueryResult } from 'pg';
import axios from 'axios'

 export const getCharacters = async () => {
    try {
        const allCharacters: (object)[] = []
        let apidata = "https://comicvine.gamespot.com/api/characters/?api_key=d1d5b2c8d71b25f222e620d4541b6ac672a05156&format=json"
        let characters = await axios.get(apidata)
        characters.data.results.map((char:any) => {
                    console.log(apidata)

            return allCharacters.push({
                id: char.id,
                name: char.name,
                description: char.deck,
                image: char.image.original_url,
                origen: char.origin.name
            })
        })
        return allCharacters;
    } catch (e) {
        console.log(e);
    }
};


