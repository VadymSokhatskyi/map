import {AppDataSource} from "../../database/data-source";
import {CanvasItem} from "../../entity/canvasItem";

export const getCanvasItems = async () => {
    const canvasItemRepository = AppDataSource.getRepository(CanvasItem);
    return await canvasItemRepository.find();
}