import express, { Request, Response } from "express";
import db from "../../models";
const { Router } = require('express')
const router = Router()
 
router.post('/' , async (req: Request, res: Response) => {
    let { comic, userId } = req.body
    userId = userId.replace(/['"]+/g, '');

    const comicDb = await db.Issues.findOne({
        where: {
            id: comic.id
        } 
    })

    const userDb = await db.Users.findOne({
        where: {
            id: userId
        }
    })

    const newPurchase = await db.Purchases.create({
        totalPrice: comic.price,
        amount: 1,
    })

    newPurchase.addIssues(comicDb)
    newPurchase.setUser(userDb)

    res.status(200).send(comic)
})

router.delete('/', async(req: Request, res: Response) => {

    let { comic, userId } = req.body
    userId = userId.replace(/['"]+/g, '');
    
    const compraId = await db.Purchases.findOne({
        where: {
            userId: userId,
        },  
        include: {
            model: db.Issues,
            as: "issues",
            through: {
                attributes: []
            },
            where: {
                id: comic.id
            }
        },
        attributes: ["id"]
    })

    const idBuscarCompra = compraId.toJSON().id

    await db.Purchases.destroy({
        where:{
            id: idBuscarCompra
        },
        include: {
            model: db.Issues,
            as: "issues",
            through: {
                attributes: []
            },
            where: {
                id: comic.id
            }
        },
    });

    res.status(200).send("borrado del carrito")
})

router.get('/:userId', async(req: Request, res: Response) => {

    let { userId } = req.params

    try {    
        userId = userId.replace(/['"]+/g, '');

        let compras = await db.Purchases.findAll({
            where: {
                userId: userId,
                status: "En Carrito",
            },
            include: {
                model: db.Issues,
                as: "issues",
                through: {
                    attributes: []
                }
            }
        })

        const issuesIds:any = []

        compras.forEach((element:any) => {
            issuesIds.push(element.toJSON().issues[0].id)
        });
        
        let issuesEnCarrito:any = []

        for(let i = 0 ; i < issuesIds.length ; i++){
            const issue = await db.Issues.findOne({
                where: {
                    id: issuesIds[i]
                }
            })

            issuesEnCarrito.push(issue.toJSON())
        }

        res.status(200).json(issuesEnCarrito) 
    } catch (error) {
        res.status(404).json({message: "No hay compras"})
    }
})

router.put('/', async(req: Request, res: Response) => {
    const { comic, card, status } = req.body;
    let { userId } = req.body
    userId = userId.replace(/['"]+/g, '');
    try {
        const issueId = await db.purchase_comics.findAll({
            where: {
                issueId: comic.id,
            },  
                attributes: ["purchaseId"]
        })

        let purchasesId:any = []

        issueId.map((e:any) => purchasesId.push(e.toJSON().purchaseId))

        for(let i = 0 ; i < purchasesId.length ; i++){
            const purchase = await db.Purchases.findOne({
                where: {
                    id: purchasesId[i],
                    userId: userId,
                    status: "En Carrito"
                }
            })

            if(purchase){
                const change = await purchase.update({
                    where: {
                        id: purchasesId[0],
                        userId: userId,
                    },
                    status: status,
                    paymentMethod: card == "credit" ? "Credit Card" : "Debit Card"
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
})

export default router