import {AppDataSource} from "../database/data-source";
import {CanvasItem} from "../entity/canvasItem";
import {ICanvasItem} from "../canvas-item.types";

const canvasItemRepository = AppDataSource.getRepository(CanvasItem);

export const getAllCanvasItemsDao = async () => {
    const canvasItems = await canvasItemRepository.find();
    return canvasItems;
}

export const getOneCanvasItemByIdDao = async (id: string) => {
    const canvasItem = await canvasItemRepository.findOneBy({id});
    return canvasItem;
}

export const saveCanvasItemDao = async (canvasItem: CanvasItem) => {
    const response = await canvasItemRepository.save(canvasItem);
    return response;
}

export const updateCanvasItemDao = async (updates: Partial<ICanvasItem>) => {
    const id = updates.id;
    const canvasItem = await canvasItemRepository.findOneBy({id})
    const updatedCanvasItem = {...canvasItem, ...updates};
    const response = await canvasItemRepository.save(updatedCanvasItem);
    return response;
}

export const deleteCanvasItemDao = async (id: string) => {
    const canvasItem = await canvasItemRepository.findOneBy({id});
    const response = canvasItem ? await canvasItemRepository.remove([canvasItem]) : null;
    return response;
}