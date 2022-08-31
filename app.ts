import express from "express";
import routes from './src/routes/index'


const app = express();

//cors:

//midlewares:
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/' ,routes )

export default app;