import axios from "axios"
import { Request, Response } from "express";
import db from "../../models";
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1'
import { Op } from 'sequelize'


//----------------------------carga los comics en la database-------------------------------------------------

export const getComics = async () => {
  try {
    const com = await db.Comics.findAll()
    if (!com.length) {
      const comics: (object)[] = []
      let listSeries = `https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json&limit=100`

      let dataList = await axios.get(listSeries)

      dataList.data.results.map(async (e: any) => {
        //const issues = await axios.get(e.api_detail_url)

        return comics.push({
          name: e.name,
          id: e.id,
          image: e.image.original_url,
          description: e.description,
          release: e.date_added.slice(0, 10),
          episodes: e.count_of_issues,
          createInDb: false,
          publisher: e.publisher.name,
          deck: e.deck,

        })
      })
      await db.Comics.bulkCreate(comics)
    }
  } catch (error) {
    console.log(error)
  }
}

//-----------------------------------------------------------------------------------------------------
const random_price = (clasical: number): number => {
  let factor_classic = clasical ? clasical : 50
  let factor_price = 1 / (factor_classic * 2)
  return (Math.random() / factor_price)
}

export const getIssues = async (id: string) => {
  try {
    let issues_db = await db.Issues.findAll({
      where: {
        volume_id: id,
        createInDb: true
      },
      order: [
        ['issue_number', 'ASC'],
      ]
    })

    if (issues_db && issues_db.length > 0) {
      console.log("issues from db", issues_db.length);
      return issues_db;
    }

    let apiURL = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&filter=volume:${id}&sort=issue_number:asc&format=json`;

    let data = await axios.get(`${apiURL}`).then(response => response.data);
    let format_results = data.results.map((e: any) => {

      let classical_year = Number(`${e.cover_date}`.split("-")[0])
      let price_random = random_price(classical_year)

      return {
        issue_number: e.issue_number,
        volume_id: e.volume.id,
        release: e.cover_date,
        name: e.name,
        price: price_random,
        image: e.image.original_url,
        createInDb: true
      }
    })

    console.log("issues from api", format_results.length);
    await db.Issues.bulkCreate(format_results)
    return format_results

  } catch (error) {
    return error
  }
}


//----------------------------- http://localhost:3000/comics -----------------------------------

export const users_db = async () => {
  const allcomicsDB = await db.Users.findAll();
  if (allcomicsDB && allcomicsDB.length > 0) {
    return allcomicsDB
  } else {
    throw new Error("No users in DB");
  }
}

//----------------------------- http://localhost:3000/comics -----------------------------------


export const postComics = async (req: Request, res: Response) => {
  const { name, image, release, description, episodes, characters, publisher, concepts } = req.body
  try {
    const exists = await db.Comics.findOne({ where: { name: name } });
    if (exists) return res.json({ Info: "Comic already exists" });

    const newComic = await db.Comics.findOrCreate({
      where: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        description,
        release,
        image,
        episodes,
        publisher
      }
    })

    let characterDB = await db.Characters.findAll({ where: { name: characters }, })
    // let publisherrel =  await db.Publishers.findOne({where : {id : publisher_Name},})
    let conceptsDB = await db.Concepts.findAll({ where: { name: concepts }, })

    newComic[0].addCharacters(characterDB)
    //await newComic[0].setPublisher(publisherrel)
    await newComic[0].addConcepts(conceptsDB)

    res.json({ Info: "Comic created right!!" });
  } catch (error) {
    console.log(error)
  }
}

export const search = async (name: any) => {
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