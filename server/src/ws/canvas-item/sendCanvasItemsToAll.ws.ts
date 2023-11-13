import {Server, WebSocket} from "ws";
import {IncomingMessage} from "http";
import {getCanvasItems} from "./getCanvasItems.ws";
import {IWSMessage, IWSRequest} from "../ws.types";

export const sendCanvasItemsToAll = async (wsServer: Server<typeof WebSocket, typeof IncomingMessage>) => {
    const canvasItems = await getCanvasItems();
    const request: IWSRequest = {
        section: 'canvas-item',
        action: 'update-map',
        data: canvasItems,
    };
    const message: IWSMessage = {
        type: 'request',
        payload: request
    }
    wsServer.clients.forEach( (client) => {
        client.send(JSON.stringify(message));
    } )
}