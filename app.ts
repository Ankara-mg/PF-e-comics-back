import express from "express";
import routes from './src/routes/index'
const morgan = require('morgan');
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import { dotenv } from "dotenv";
//import  cloudinary  from './config/utils';

import cors from 'cors'

const app = express();
//cors:
app.use(cors({ origin: 'https://e-comics.vercel.app' }))
//midlewares:

//----------

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
//app.use(cookieParser());

app.use(morgan('dev'));
app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', 'https://e-comics.vercel.app'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes)

export default app;