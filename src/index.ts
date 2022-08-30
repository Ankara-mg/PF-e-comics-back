import express from 'express'
const app  = express();

import indexRoutes from './routes/index'
//midleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRoutes)

app.listen(3000, () => {
    console.log("este es el puerto 3000  hola")
})