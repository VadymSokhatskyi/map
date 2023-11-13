import { useQuery, useMutation } from 'react-query';

import {apiClient} from "./config";

import {ICanvasItem} from "../../types/canvas.types";
import {IDatabaseCanvasItem} from "../../types/api/canvas-item.api.types";

import {API_ROUTES} from "../apiRoutes";

export const getCanvasItemsApi = async (): Promise<IDatabaseCanvasItem[] | undefined> => {
    try {
        const response = await apiClient.get(API_ROUTES.CANVAS_ITEM_GET);
        return response?.data;
    } catch (e) {
        console.log(e);
    }
}

export const useGetCanvasItemsApi = () => {
    return useQuery(['canvas-items'], () => getCanvasItemsApi());
}

export const saveCanvasItemApi = async (payload: ICanvasItem) => {
    try {

        const { id, name, category, x, y, width, height } = payload;

        const data = { name, category, width, height };

        const toSave = {
            id,
            x,
            y,
            userId: '',
            data: JSON.stringify(data)
        }

        const response = await apiClient.post(API_ROUTES.CANVAS_ITEM_SAVE, toSave);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const useSaveCanvasItemApi = () => {
    return useMutation((payload: ICanvasItem) => saveCanvasItemApi(payload))
}

export const updateCanvasItemApi = async (payload: ICanvasItem) => {
    try {

        const { id, name, category, x, y, width, height } = payload;

        const data = { name, category, width, height };

        const toUpdate = {
            id,
            x,
            y,
            userId: '',
            data: JSON.stringify(data)
        }

        const response = await apiClient.post(API_ROUTES.CANVAS_ITEM_UPDATE, toUpdate);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export const useUpdateCanvasItemApi = () => {
    return useMutation((payload: ICanvasItem) => updateCanvasItemApi(payload))
}

export const deleteCanvasItemApi = async (id: string) => {
    try {
        const response = await apiClient.delete(API_ROUTES.CANVAS_ITEM_DELETE(id));
        return response;
    } catch (e) {
        console.log(e)
    }
}

export const useDeleteCanvasItemApi = () => {
    return useMutation((id: string) => deleteCanvasItemApi(id));
}