import { WebSocket, Server } from "ws";
import {IncomingMessage} from "http";

import {getAllCanvasItemsWs} from "./getAllCanvasItems.ws";
import {saveCanvasItemWs} from "./saveCanvasItem.ws";
import {updateCanvasItemWs} from "./updateCanvasItem.ws";
import {deleteCanvasItemWs} from "./deleteCanvasItem.ws";

import { IWSRequest } from "../ws.types";

export const useCanvasItemWs = async (request: IWSRequest, wsClient: WebSocket, wsServer: Server<typeof WebSocket, typeof IncomingMessage>) => {

    const { action } = request;

    switch (action) {
        case 'get-all':
            getAllCanvasItemsWs(wsClient);
            break;

        case 'save':
            saveCanvasItemWs(request, wsClient, wsServer);
            break;

        case 'update':
            updateCanvasItemWs(request, wsClient, wsServer);
            break;

        case 'delete':
            deleteCanvasItemWs(request, wsClient, wsServer);
            break;
    }
}