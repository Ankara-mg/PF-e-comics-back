import db from "../../models";
import { Request, Response } from "express";
import { getDetails } from "./controller.details";
import { userSignup } from "./controller.users";

export const getFavDb = async (req: Request, res: Response) => {
    // console.log(req.params)
    const {userId} = req.params
    // console.log( userId, "desde el back ln 88888888888888888888888888888")
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
    // const findFav = await db.Users.findAll({
    //     where: {id : userId},
    //     include: {
    //         model: db.Issues,
    //         as: "issues",
    //         attributes: ["image", "name", "issue_number", "price" ], 
    //         through: {
    //             attributes: []
    //         }
    //     }
    // });
            const mapIssues = findFav.map((e: any) => {
                return {
                    issues: e.issues    
                }
            })
            // res.status(201).send(findFav)
            res.status(201).send(mapIssues)
            // console.log(findFav)
            
            // console.log(findFav, "para renderizar en el front")
    } catch (error) {
        console.log(error)
    }
}

export const postFavs = async (req: Request, res: Response) => {
    const { userId, issuesId } = req.body
    // console.log(req.body)
    // console.log(userId, "desde el back revisando front")
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

// export const remuveFav = async (req: Request, res: Response) => {
//     const {id} = req.body
//     try {
//         if(id){
//         const idFind = await getDetails(id)
//         await db.favorites_list.destroid({
//             where: {
//                 id: id 
//             }
//         })
//         res.status(201).json(idFind)
//     }
//     } catch (error) {
//         console.log(error)
//     }
// }

export const remuveFav = async (req: Request, res: Response) => {
    const {issuesId, userId} = req.body
    console.log(issuesId, userId)
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


