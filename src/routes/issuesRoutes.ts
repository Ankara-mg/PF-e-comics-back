import { Router } from 'express';
import db from "../../models/index";
import axios from "axios"


const router = Router()
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'


// router.get('/', async (req, res) => {
//     try {
//         const volumes = await db.Comics.findAll({
//             attributes: ["api_url_detail"],
//         })
//         const issues = await db.Issues.findAll()
//         if (!issues.length) {
            
//             try {
//                 let listVolumes = volumes.map((vol: any) => axios.get(`${vol.api_url_detail}?api_key=${apiKey}`))
//                 console.log(listVolumes)
//                 const values =  Promise.all(listVolumes).then((r) => {
//                     r.map((l) => l.data)
//                 } )
//                 res.send(values)
//             } catch (error) {
//                 return error
//             }
//     }
//     } catch (error) {
//         console.log(error)
//     }
// })


export const getIssues = async () => {
    try {
        const com = await db.Comics.findAll()
        if(!com.length){

            const comics: (object)[] = []
            let listSeries = await axios.get(`https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json&limit=10`)
            let respuesta = listSeries.data.results
            let issuesinfo = []
            
            for (let i = 0; i < respuesta.length; i++){
                const issues = await axios.get(`${respuesta[i]}?api_key=${apiKey}&format=json)

            }
          
                //console.log(e.api_detail_url)
                
                // return comics.push({
                //     name: e.name,
                //     id: e.id,
                //     image: e.image.original_url,
                //     description: e.deck,
                //     release: e.date_added.slice(0, 10),
                //     episodes: e.count_of_episodes,
                //     api_url_detail: e.api_detail_url
                // })
            
            await db.Comics.bulkCreate(comics)
        }
// const api = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
//     let respuesta = api.data.results
//         let pokemonInfo = [];
//         for (let i = 0; i < respuesta.length; i++) {
//             const pokemon = await axios.get(`${respuesta[i].url}`)
//             let object = {
//                 id: respuesta[i].url.split('/')[6],
//                 name: pokemon.data.name,
//                 healthpoints:pokemon.data.healthpoints,
//                 attack:pokemon.data.stats[1].base_stat,
//                 height:pokemon.data.height,
//                 weight:pokemon.data.weight,
//                 img: pokemon.data.sprites.other.dream_world.front_default,
//                 types: pokemon.data.types.map(e => e.type.name)
//             }
//             pokemonInfo.push(object)
//         }

//     let pokemons = await Pokemon.findAll({
//         include:{
//             model:Type,
//              attributes:["name"],
//             // thorough:{
//             //     atributes:{},
            
//             // },
            
         
//       }  
//     })


//@ts-ignore-start
//console.log(values);
//@ts-ignore-end


// let result = dataList.data.results.map((e: any) =>
// (
//     {
//         name: e.name,
//         id: e.id,
//         image: e.image.original_url,
//         description: e.deck,
//         release: e.date_added.slice(0, 10),
//         episodes: e.count_of_episodes,
//         api_url_detail: e.api_detail_url
//     }
// )
// )



//     // await db.Issues.bulkCreate(result)
export default router;