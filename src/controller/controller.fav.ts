import db from "../../models";
import { Request, Response } from "express";
import { getDetails } from "./controller.details";

export const getFavDb = async (req: Request, res: Response) => {
    //id por query del user 
    try {  
    const findFav = await db.favorites_list.findAll();
                const fav = findFav.map((e: any )=> {
                    return {
                        id: e.comicId,
                        user: e.userId
                    }
                })
            res.status(201).send(fav)
    } catch (error) {
        console.log(error)
    }
}


export const postFavs = async (req: Request, res: Response) => {
    console.log(req.body)
    const { id, image, issue_number, name, price, volume_id} = req.body
    try {
        const exists= await db.favorites_list.findOne({ where: { id: id } });
        if (exists) return res.json({ Info: "Comic already exists" });

        const newFav = await db.favorites_list.findOrCreate({
        where:{
            name: name.charAt(0).toUpperCase() + name.slice(1),
            id,
            image,
            issue_number,
            price,
            volume_id
            }
        }) 
        let issuesDb = await db.Issues.findAll({where : {id : volume_id},})
                newFav.addIssues(issuesDb)
        let usersDb = await db.Users.findAll({where : {id : id},})
                newFav.addUsers(usersDb)

            res.json({ Info: "Comic add to favorites!!"})
    }catch (error) {
        console.log(error)
    }
}

export const remuveFav = async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        if(id){
        const idFind = await getDetails(id)
        await db.favorites_list.destroid({
            where: {
                id: id 
            }
        })
        res.status(201).json(idFind)
    }
    } catch (error) {
        console.log(error)
    }
}


