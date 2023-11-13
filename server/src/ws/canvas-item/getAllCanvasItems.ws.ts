import {WebSocket} from "ws";
import {getCanvasItems} from "./getCanvasItems.ws";
import {IWSMessage, IWSRequest} from "../ws.types";

export const getAllCanvasItemsWs = async (wsClient: WebSocket) => {
    const canvasItems = await getCanvasItems();
    if (canvasItems) {
        const response: IWSRequest = {
            section: 'canvas-item',
            action: 'update-map',
            data: canvasItems,
        };
        const message: IWSMessage = {
            type: 'request',
            payload: response
        }
        wsClient.send(JSON.stringify(message));
    }
}