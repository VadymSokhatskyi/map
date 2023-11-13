import express, { Express } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors';

import { AppDataSource } from "./database/data-source";

import { useWsServer } from "./ws/useWsServer";

import { router } from "./routes";

dotenv.config();

const serverPort = process.env.SERVER_PORT;

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use('/', router);

app.listen(serverPort, () => {
    console.log("Let's run!")
    AppDataSource.initialize().then( () => {
        console.log('Database initialized.')
    } )
})

useWsServer();