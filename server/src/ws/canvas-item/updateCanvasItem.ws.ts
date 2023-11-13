import {Server, WebSocket} from "ws";
import {IncomingMessage} from "http";

import {AppDataSource} from "../../database/data-source";

import {sendCanvasItemsToAll} from "./sendCanvasItemsToAll.ws";

import {CanvasItem} from "../../entity/canvasItem";
import {IWSMessage, IWSRequest, IWSResponse} from "../ws.types";

export const updateCanvasItemWs = async (request: IWSRequest, wsClient: WebSocket, wsServer: Server<typeof WebSocket, typeof IncomingMessage>) => {
    const canvasItemRepository = AppDataSource.getRepository(CanvasItem);
    const updateData = request.data;
    const idToUpdate = updateData?.id;
    if (idToUpdate) {
        const item = await canvasItemRepository.findOneBy({ id: idToUpdate })
        const updatedCanvasItem = {...item, ...updateData};
        const updateOperation = await canvasItemRepository.save(updatedCanvasItem);
        if (updateOperation) {
            const response: IWSResponse = {
                status: 200,
                message: 'Canvas item updated.',
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