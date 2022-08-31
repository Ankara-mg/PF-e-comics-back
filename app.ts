import express from "express";
import routes from './src/routes/index'


const app = express();

//cors:

//midlewares:


app.use('/' ,routes )

export default app;