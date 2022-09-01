
/* export  const controllerUser = {
    getusers: async(req:Request, res:Response,) =>{
        const obj = {
            name: 'lucas7',
            email: 'lucas7@gmail.com',
            password: 12345
        }
        const newUser = await  db.User.create(obj)
        return res.json(newUser)
    },
    
} */

import { Request, Response, NextFunction } from "express";
import db from "../../models";
import axios from 'axios';
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getCharacters = async (req: Request, res: Response) => {
    try {
        const allCharacters: (object)[] = []
        let apidata = `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json&limit=10`
        let characters = await axios.get(apidata)
        characters.data.results.map((char: any) => {

            return allCharacters.push({
                id: char.id,
                name: char.name,
                description: char.deck,
                image: char.image.original_url,
                gender: char.gender,
            })
            
        })
        await db.Characters.bulkCreate(allCharacters)
        res.send(allCharacters);
    } catch (e) {
        console.log(e);
    }
};




// export const getCharactersDB = async(req: Request, res:Response) =>{
//     const allCharacters = await db.Characters.findAll();
//     const character = allCharacters.map((char: { id: any; name: any; description: any; image: any; }) => {
//         return {
//             id: char.id,
//             name:char.name,
//             description: char.description,
//             image: char.image

//         }
//     })
//     console.log("soy esta funcion")
//     res.send(character)
//  }
