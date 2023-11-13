import {useWebSocketApi} from "./ws.api";
import {IWSMessage, IWSRequest} from "../../types/api/ws.api.types";
import {ICanvasItem} from "../../types/canvas.types";

export const useCanvasItemApi = () => {
    const { sendWsMessage } = useWebSocketApi();

    const getCanvasItemsApi = () => {
        const request: IWSRequest = {
            section: 'canvas-item',
            action: 'get-all',
            data: null,
        };
        const message: IWSMessage = {
            type: 'request',
            payload: request,
        }
        sendWsMessage(message);
    }

    const getCanvasItemApi = () => {

    }

    const saveCanvasItemApi = (payload: ICanvasItem) => {
        const request: IWSRequest = {
            section: 'canvas-item',
            action: 'save',
            data: payload,
        };
        const message: IWSMessage = {
            type: 'request',
            payload: request,
        }
        sendWsMessage(message);
    }

    const updateCanvasItemApi = (payload: Partial<ICanvasItem>) => {
        const request: IWSRequest = {
            section: 'canvas-item',
            action: 'update',
            data: payload,
        };
        const message: IWSMessage = {
            type: 'request',
            payload: request,
        }
        sendWsMessage(message);
    }

    const deleteCanvasItemApi = (id: string) => {
        const request: IWSRequest = {
            section: 'canvas-item',
            action: 'delete',
            data: { id },
        }
        const message: IWSMessage = {
            type: 'request',
            payload: request,
        }
        sendWsMessage(message);
    }

    return {
        getCanvasItemsApi,
        getCanvasItemApi,
        saveCanvasItemApi,
        updateCanvasItemApi,
        deleteCanvasItemApi,
    }
}