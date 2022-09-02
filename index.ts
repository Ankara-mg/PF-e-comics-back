import db from "./models";
import app from "./app";
// import { Request, Response, NextFunction } from "express";
// import { getComics } from "./src/controller/episodesController"
// import { getCharacters} from './src/controller/controller.characters'


//probando modelos
import { publishers } from './seeders/publishers';
import { concepts } from "./seeders/concepts";
import { comics } from "./seeders/comics";
import { users } from './seeders/users'
import { concept_comic } from './seeders/concepts_comics';
import { favorites_list } from "./seeders/favorites_list";
import { ratings } from "./seeders/ratings";
import { v4 as uuidv4 } from 'uuid'
//import db from './models'


const crearTodo = async() => {

    // --------------------------------------
    //              MAPS  
    //---------------------------------------

    // PUBLISHERS
    publishers.map(pub => {
        db.Publishers.create(pub)
    })

    // CONCEPTS
    concepts.map(con => {
        db.Concepts.create(con)
    })

    //COMICS
    comics.map(co => {
        db.Comics.create(co)
    })

    // USERS
    users.map(u => {
        db.Users.create(u)
    })

    // RATINGS
    ratings.map(r => {
        db.Ratings.create(r)
    })
    
    // --------------------------------------
    //              VARIABLES  
    //---------------------------------------
    const newUser = await db.Users.create({
        id: uuidv4(),
        username: "OIoidiajsodj",
        email: "nada",
    })

    console.log(newUser, "USER")
    
    const newPublisher = await db.Publishers.findOne({
        where: {
            name: "Marvel",
        }
    })
    
    const newComic = await db.Comics.findOne({
        where :{
            name: "Batman"
        }
    })
    
    
    const newRating = await db.Ratings.findOne({
        where: {
            rating: 1.2,
        }
    })

    // --------------------------------------
    //              RELACIONES  
    //---------------------------------------
    
    // RELACION COMIC-CONCEPT
    concept_comic.map(co => {
        db.concept_comic.create(co)
    })
    
    // RELACION USER-COMIC
    /* favorites_list.map(co => {
        db.favorites_lists.create(co)
    }) */

    await newComic.setPublisher(newPublisher) // MUCHOS Comics belongsTo UN Publishers
    await newComic.setRatings(newRating) // MUCHOS Ratings belongsTo UN Comic
    await newUser.setRatings(newRating)  // MUCHOS Ratings belongsTo UN Usuario

}



const port = process.env.PORT || 3000;
db.sequelize.sync({ force: true }).then(async ()=>{

    await crearTodo()

    app.listen(port,()=>{
        // getComics
        // getCharacters
        console.log(`App listening on port ${port}`)
    })
})
