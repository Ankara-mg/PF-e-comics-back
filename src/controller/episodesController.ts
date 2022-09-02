import axios from "axios"
import { Request, Response } from "express";
import db from "../../models";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'

export const getComics = async () => {
    try {
        const com = await db.Comics.findAll()
        if(!com.length){
            const comics: (object)[] = []
            let listSeries = `https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json`
            let dataList = await axios.get(listSeries)
    
            dataList.data.results.map((e: any) => {
                return comics.push({
                    name: e.name,
                    id: e.id,
                    image: e.image.original_url,
                    description: e.deck,
                    release: e.date_added.slice(0, 10),
                    episodes: e.count_of_episodes
                })
            })
            await db.Comics.bulkCreate(comics)
        }
    //    return comics
    } catch (error) {
        console.log(error)
    }
}

export const getComicsDB = async(req: Request, res: Response) =>{
    try {
        const allcomicsDB = await db.Comics.findAll();
       
        const comics = allcomicsDB.map((char: { id: any; name: any; description: any; image: any; }) => {
            return {
                id: char.id,
                name:char.name,
                description: char.description,
                image: char.image
    
            }
        })
      //  return publishers
      res.send(comics)
        
    } catch (error) {
        console.log(error)
    }
   
 }



export const postComics = async (req: Request, res: Response) => {
    const { name, image, release, description, episodes} = req.body
// console.log(req.body)
    try{
        const newComic = await db.Comics.create({                                   //create   findOrCreate
            name,
            image,
            release,
            description, 
            episodes,
            createInDb: true
        })
        // const characterDb = await db.Characters.findAll({
        //     where: {name : db.Characters}
        // })
        // newComic.addCharacters(characterDb)
        res.status(200).send('El comic fue creado exitosamente😊')
    }catch(error){
        // next()
        console.log(error)
    }
}

export const SearchName = async(req: Request, res: Response) =>{
    const {name} = req.query
    const names: [] = []
    console.log(names)
    if(name){
         const url = `https://comicvine.gamespot.com/api/search/?api_key=d1d5b2c8d71b25f222e620d4541b6ac672a05156&format=json&query=${name}&resources=volume&limit=10`     //volume
         let datos = await axios.get(url)
        datos = datos.data.results.map((e: any) => {
            let results = {
                name: e.name,
                description: e.deck,
                image: e.image.original_url,
                origin: e.origin.name,
                publisher: e.publisher.name
            }
            return results
        })
        res.status(200).send(names)
    }
   else{
    res.status(404).send("No existe name ")
   }
}

// "tsc": "tsc",
//     "dev": "concurrently \"tsc --watch\" \"nodemon dist/index.js\"",
