import db from "../../models";
import { Request, Response } from "express";
import { getDetails } from "./controller.details";
import { userSignup } from "./controller.users";

export const getFavDb = async (req: Request, res: Response) => {
    const {userId} = req.params
    try {  
        const findFav = await db.Users.findAll({
                where: {id : userId},
                include: {
                    model: db.Issues,
                    as: "issues",
                    // attributes: ["image", "name", "issue_number", "price" ], 
                    through: {
                        attributes: []
                    }
                }
            });
            const mapIssues = findFav.map((e: any) => {
                return {
                    issues: e.issues    
                }
            })
            res.status(201).send(mapIssues)
    } catch (error) {
        console.log(error)
    }
}

export const postFavs = async (req: Request, res: Response) => {
    const { userId, issuesId } = req.body
    try {
        let findUser = await db.Users.findOne({
            where: {id : userId}
        })
        console.log(findUser, "line 37")
        let findIssue = await db.Issues.findOne({
            where: {id : issuesId}
        })
        console.log(findIssue, "line 41")
        await findIssue.addUser(findUser)
        // await findUser.addIssue(findIssue)
    
            res.json({ Info: "Comic add to favorites!!"})
    }catch (error) {
        console.log(error)
    }
}

export const remuveFav = async (req: Request, res: Response) => {
    const {issuesId, userId} = req.body
    try {
        const findFavrem = await db.favorites_list.destroy({
            where:
                {userId : userId, 
                issuesId : issuesId}
        });
        res.status(201).send("Comic eliminado")
    } catch (error) {
        console.log(error)
    }
}


