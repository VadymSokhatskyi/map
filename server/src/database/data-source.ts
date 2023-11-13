import { DataSource } from 'typeorm';
import { CanvasItem } from "../entity/canvasItem";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password",
    database: "map",
    synchronize: true,
    logging: true,
    entities: [CanvasItem],
    subscribers: [],
    migrations: [],
})