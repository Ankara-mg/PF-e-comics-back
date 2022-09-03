//@ts-nocheck

import { Request, Response } from "express";
import db from "../../models";
import axios from 'axios';
import { findAll } from "../../dist/models/Characters";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getCharacters = async () => {
    try {
        const char = await db.Characters.findAll()
        if(!char.length){
            const allCharacters: (object)[] = []
            let apidata = `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json&limit=100`
            let characters = await axios.get(apidata)
            characters.data.results.map((char: any) => {
                // console.log('DESC LENGTH', char.deck.length)
    
                return allCharacters.push({
                    id: char.id,
                    name: char.name,
                    description: char.deck,
                    image: char.image.original_url,
                    gender: char.gender,
                })
            })
            await db.Characters.bulkCreate(allCharacters)
        }
    } catch (e) {
        console.log(e);
    }
};

//---------------------------------------------RUTA: http://localhost:3000/characters   ---------------------

export const getCharactersDB = async(req: Request, res:Response) =>{
    const allCharacters = await db.Characters.findAll();
    const character = allCharacters.map((char: { id: any; name: any; description: any; image: any; }) => {
        return {
            id: char.id,
            name:char.name,
            description: char.description,
            image: char.image

        }
    })
    
    res.send(character)
    
 }