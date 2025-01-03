//@ts-nocheck
import axios from "axios"
import { Request, Response } from "express";
import db from "../../models";
import {Op} from 'sequelize'
// import cloudinary from '../../config/utils'
//import cloudinary from "../../config/utils";

require('dotenv').config();
const apiKey = process.env.API_KEY

//----------------------------carga los comics en la database-------------------------------------------------

export const getComics = async () => {
  try{
    const comics_db = await db.Comics.findAll()
    if (!comics_db.length) {
      let listSeries = `https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json&limit=100`
  
      let comics = await axios.get(listSeries).then(response => response.data);
      let format_results = comics.results.map((e: any) => (
        {
          name: e.name,
          id: e.id,
          image: e.image.original_url,
          description: e.description,
          release: e.date_added.slice(0, 10),
          episodes: e.count_of_issues,
          createInDb: false,
          publisher: e.publisher.name,
          deck: e.deck,
        }
      ))
  
      await db.Comics.bulkCreate(format_results)
      return { msg: "Comics Creados en db" }
    }
    return comics_db
  }catch(e){
    console.log(e)
  }
}

export const addComic_db = async (id) => {
  try {
    const comics_db = await db.Comics.findAll({
      where: { id }
    })
    if (comics_db.length > 0) return { msg: "Comic en db" }
  
    let listSeries = `https://comicvine.gamespot.com/api/volume/4050-${id}?api_key=${apiKey}&format=json&limit=100`
  
    let comic = await axios.get(listSeries).then(response => response.data);
    const { name, image, description, date_added, count_of_issues, publisher, deck } = comic.results
    let results = {
      name,
      id,
      image: image.original_url,
      description: description,
      release: date_added.slice(0, 10),
      episodes: count_of_issues,
      createInDb: true,
      publisher: publisher.name,
      deck: deck,
    }
  
    const newComic = await db.Comics.create(results)
    return { msg: "Comic agregado a db", comic: newComic } 
  } catch (error) {
    console.log(error)
  }
}


//-----------------------------------------------------------------------------------------------------
const random_price = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}

export const getIssues = async (id: string) => {
  try {
    let issues_db = await db.Issues.findAll({
      where: {
        volume_id: id,
        createInDb: true
      },
      include: {
        model: db.Ratings,
        attributes: ['rating', 'UserId', 'description'],
      },
      order: [
        ['issue_number', 'ASC'],
      ]
    })

    if (issues_db && issues_db.length > 0) {
      //   console.log("issues from db", issues_db.length);
      return issues_db;
    }

    let apiURL = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&filter=volume:${id}&sort=issue_number:asc&format=json`;

    let data = await axios.get(`${apiURL}`).then(response => response.data);
    let format_results = data.results.map((e: any) => {

      //let classical_year = Number(`${e.cover_date}`.split("-")[0])
      let price_random = random_price(15, 100)

      return {
        id: e.id,
        issue_number: e.issue_number,
        volume_id: e.volume.id,
        release: e.cover_date,
        name: e.name,
        price: price_random,
        image: e.image.original_url,
        createInDb: true
      }
    })

    // console.log("issues from api", format_results.length);
    await addComic_db(id)
    await db.Issues.bulkCreate(format_results)
    return format_results

  } catch (error) {
    return error
  }
}


//----------------------------- http://localhost:3000/comics -----------------------------------

export const getComicsDB = async (req: Request, res: Response) => {
  try {
    const allcomicsDB = await db.Comics.findAll();

    const comics = allcomicsDB.map((char: {

      publisher: any; createInDb: any; release: any; episodes: any; id: any; name: any; description: any; image: any;
    }) => {

      return {
        id: char.id,
        name: char.name,
        description: char.description,
        image: char.image,
        //api_url_detail: char.api_url_detail,
        release: char.release,
        episodes: char.episodes,
        createInDb: char.createInDb,
        publisher: char.publisher

      }
    })
    res.send(comics)

  } catch (error) {
    console.log(error)
  }
}

//----------------------------- http://localhost:3000/comics -----------------------------------


export const postComics = async (req: Request, res: Response) => {
    // const {  characters, concepts, name, description, release, image, episodes, publisher} = req.body
    const {values, imagen,characters, concepts} = req.body
    // console.log(values, "valuessssssss")

    try {
        const exists= await db.Comics.findOne({ where: { name: values.name } });
        if (exists) return res.json({ Info: "Comic already exists" });

        const newComic = await db.Comics.findOrCreate({
        where:{
            // name:name.charAt(0).toUpperCase() + name.slice(1),
            name: values.name,
            description:values.description,
            release: values.release,
            image: imagen,
            episodes: values.episodes,
            publisher: values.publisher
        }
    }) 

        // let characterDB =  await db.Characters.findAll({where : {name : characters},})
       // let publisherrel =  await db.Publishers.findOne({where : {id : publisher_Name},})             //
        // let conceptsDB =   await db.Concepts.findAll({where : {name : concepts},})
        
            // newComic[0].addCharacters(characterDB)
            //await newComic[0].setPublisher(publisherrel)              //
            // await newComic[0].addConcepts(conceptsDB)

                res.json({ Info: "Comic created right!!"});
        } catch (error) {
            console.log(error)
        }
}

//--------------------------------------- http://localhost:3000/comics/name?name="name" ------------------

export const SearchName = async (name: any) => {
  if (name.length > 0) {
    try {
      const apiUrl = `https://comicvine.gamespot.com/api/search/?api_key=${apiKey}&format=json&query=${name}&resources=volume&limit=100`

      let comics = await axios.get(apiUrl).then(response => response.data)
      let result = comics.results.map((e: any) => (
        {
          id: e.id,
          name: e.name,
          image: e.image.original_url,
          // publisher: e.publisher.name
        }
      ))
      return result ? result : []
    } catch (error) {
      return error
    }
  }
}

export const SearchNameDB = async (name: any) => {
  try {
    return await db.Comics.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: [
        { model: db.Characters },
        { model: db.Concepts },
      ],
    })
  } catch (error) {
    console.log('Error en info Db');
  }
}

export const getAllInfo = async (req: Request, res: Response) => {
  const { name } = req.query
  try {
    const infoApi = await SearchName(name);
    const infoDb = await SearchNameDB(name);

    const infoTotal = infoDb.concat(infoApi)
    res.send(infoTotal)
  } catch (error) {
    console.log('Error en info total');
  }
}

export const loggin = async (req: any, res: { oidc: { login: (arg0: { authorizationParams: { screen_hint: string; }; }) => void; }; }) => {
  res.oidc.login({
    authorizationParams: {
      screen_hint: 'signup',
    },
  });
};


