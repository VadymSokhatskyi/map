import {Server, WebSocket} from "ws";
import {IncomingMessage} from "http";

import {AppDataSource} from "../../database/data-source";

import {sendCanvasItemsToAll} from "./sendCanvasItemsToAll.ws";

import {CanvasItem} from "../../entity/canvasItem";
import {IWSMessage, IWSRequest, IWSResponse} from "../ws.types";

export const saveCanvasItemWs = async (request: IWSRequest, wsClient: WebSocket, wsServer: Server<typeof WebSocket, typeof IncomingMessage>) => {

    const canvasItemRepository = AppDataSource.getRepository(CanvasItem);

    const payload = request.data;

    if (payload) {
        const canvasItem = new CanvasItem();

        canvasItem.id = payload.id;
        canvasItem.x = payload.x;
        canvasItem.y = payload.y;
        canvasItem.data = payload.data;
        canvasItem.userId = '';
        canvasItem.timeUpdate = '';

        const timeCreate = new Date().toISOString();

        canvasItem.timeCreate = timeCreate;

        const saveOperation = await canvasItemRepository.save(canvasItem);
        if (saveOperation) {
            const response: IWSResponse = {
                status: 200,
                message: 'Canvas item saved.',
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