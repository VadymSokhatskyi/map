import {
    getAllCanvasItemsDao,
    getOneCanvasItemByIdDao,
    saveCanvasItemDao,
    updateCanvasItemDao,
    deleteCanvasItemDao,
} from "../dao/canvas-item.dao";
import {CanvasItem} from "../entity/canvasItem";
import {ICanvasItem} from "../canvas-item.types";

export const getAllCanvasItemsService = async () => {
    const canvasItems = await getAllCanvasItemsDao();
    return canvasItems;
}

export const getOneCanvasItemByIdService = async (id: string) => {
    const canvasItem = getOneCanvasItemByIdDao(id);
    return canvasItem;
}

export const saveCanvasItemService = async (payload: CanvasItem) => {
    const canvasItem = new CanvasItem();

    canvasItem.id = payload.id;
    canvasItem.x = payload.x;
    canvasItem.y = payload.y;
    canvasItem.data = payload.data;
    canvasItem.userId = '';
    canvasItem.timeUpdate = '';

    const timeCreate = new Date().toISOString();
    canvasItem.timeCreate = timeCreate;

    const response = await saveCanvasItemDao(canvasItem);
    return response;
}

export const updateCanvasItemService = async (updates: Partial<ICanvasItem>) => {
    const response = await updateCanvasItemDao(updates);
    return response;
}

export const deleteCanvasItemService = async (id: string) => {
    const response = await deleteCanvasItemDao(id);
    return response;
}