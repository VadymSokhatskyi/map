import {Server, WebSocket} from "ws";
import {IncomingMessage} from "http";

import {AppDataSource} from "../../database/data-source";

import {sendCanvasItemsToAll} from "./sendCanvasItemsToAll.ws";

import {CanvasItem} from "../../entity/canvasItem";
import {IWSMessage, IWSRequest, IWSResponse} from "../ws.types";

export const deleteCanvasItemWs = async (request: IWSRequest, wsClient: WebSocket, wsServer: Server<typeof WebSocket, typeof IncomingMessage>) => {

    const canvasItemRepository = AppDataSource.getRepository(CanvasItem);

    const idToDelete = request.data.id;

    if (idToDelete) {
        const canvasItemToDelete = await canvasItemRepository.findOneBy({ id: idToDelete });
        const deleteOperation = canvasItemToDelete ? await canvasItemRepository.remove([canvasItemToDelete]) : null;
        if (deleteOperation) {
            const response: IWSResponse = {
                status: 200,
                message: 'Canvas item deleted.',
                data: null,
            };
            const message: IWSMessage = {
                type: 'response',
                payload: response
            }
            wsClient.send(JSON.stringify(message));
            await sendCanvasItemsToAll(wsServer);
        }
    }
}