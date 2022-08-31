//@ts-nocheck
//import { Request, Response } from 'express';
// import { pool } from '../database';
//import { QueryResult } from 'pg';
const {API_KEY} = process.env
import axios from 'axios'

 export const getCharacters = async () => {
    try {
        const allCharacters: (object)[] = []
        let apidata = `https://comicvine.gamespot.com/api/characters/?api_key=49e9caca6b1b3b836f076299d5a84df4e9ab60a1&format=json`
        let characters = await axios.get(apidata)
        characters.data.results.map((char: any) => {
            return allCharacters.push({
                id: char.id,
                name: char.name,
                description: char.deck,
                image: char.image.original_url,
                // origin: char.origin.name    //? char.origin.name : "Desconocido"
                // isAvaliable: true,
                // price: 
            })
        })
        return allCharacters;
    } catch (e) {
        console.log(e);
    }
};





