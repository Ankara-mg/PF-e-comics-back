import express from "express";
import routes from './src/routes/index'
import morgan from "morgan";
import cors from 'cors'

const app = express();

app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('dev'));

app.use((req, _res, next) => {
  console.log("METHOD", req.method, "ORIGIN", req.headers.origin);
  next();
});

app.use('/', routes)

export default app;