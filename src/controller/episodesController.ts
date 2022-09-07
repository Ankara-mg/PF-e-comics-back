import axios from "axios"
import { Request, Response } from "express";
import { getDetails } from './controller.details';
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
          // description: e.description,
          // release: e.date_added.slice(0, 10),
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
//----------------------------carga los issues en la database-------------------------------------------------

const random_price = (clasical: number): number => {
  let factor_classic = clasical ? clasical : 50
  let factor_price = 1 / (factor_classic * 2)
  return (Math.random() / factor_price)
}

export const getIssues = async (id: string, currentPage: number = 0) => {
  try {
    let issues_numbers_db: any = []
    let in_db: any = []
    let notIn_db: any = []
    let detail = await getDetails(id);


    // pagination
    let offset = 0
    if (currentPage * 10 > detail.count_of_issues) {
      offset = detail.count_of_issues - 10 < 0 ? 0 : detail.count_of_issues - 10

    } else {
      offset = currentPage * 10
    }

    let issues_db = await db.Issues.findAll({
      where: {
        volume_id: id,
        createInDb: true
      },
      order: [
        ['issue_number', 'ASC'],
      ],
      limit: 10
    })

    if (issues_db.length > 0) {
      issues_numbers_db = issues_db.map((issue: any) => (issue.issue_number))
    }

    let apiURL = `https://comicvine.gamespot.com/api/issues/?api_key=${apiKey}&filter=volume:${id}&sort=issue_number:asc&format=json&offset=${offset}&limit=${10}`;
    let data = await axios.get(`${apiURL}`).then(response => response.data);


    let format_results = data.results.map((e: any) => {

      let classical_year = Number(`${e.cover_date}`.split("-")[0])
      let price_random = random_price(classical_year)

      return {
        issue_number: Number(e.issue_number),
        volume_id: e.volume.id,
        release: e.cover_date,
        name: e.name,
        price: price_random,
        image: e.image.original_url,
        createInDb: true
      }
    })



    in_db = format_results.filter((issue: any) => issues_numbers_db.includes(issue.issue_number))
    notIn_db = format_results.filter((issue: any) => !issues_numbers_db.includes(issue.issue_number))

    if (in_db.length === 10) {
      console.log("from db", issues_db.length);
      return issues_db
    }


    await db.Issues.bulkCreate(notIn_db)
    console.log("from api");
    return format_results

  } catch (error) {
    return error
  }
}


//----------------------------- http://localhost:3000/comics -----------------------------------

export const getComicsDB = async (req: Request, res: Response) => {
  try {
    const allcomicsDB = await db.Comics.findAll({
    });

    const comics = allcomicsDB.map((char: {

      publisher: any; createInDb: any; release: any; episodes: any; id: any; name: any; description: any; image: any;
    }) => {

      return {
        id: char.id,
        name: char.name,
        // description: char.description,
        image: char.image,
        //api_url_detail: char.api_url_detail,
        // release: char.release,
        n_episodes: char.episodes,
        createInDb: char.createInDb,
        // publisher: char.publisher

      }
    })
    res.send(comics)

  } catch (error) {
    console.log(error)
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

//--------------------------------------- http://localhost:3000/comics/name?name="name" ------------------

export const SearchName = async (name: any) => {
  if (name.length > 0) {
    try {
      const url = `https://comicvine.gamespot.com/api/search/?api_key=${apiKey}&format=json&query=${name}&resources=volume`
      let comics = await axios.get(url)

      let result = comics.data.results.map((e: any) => (
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
  } else {
    return []
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

