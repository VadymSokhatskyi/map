import WebSocket from "ws";
import {useCanvasItemWs} from "./canvas-item/useCanvasItemWs";
import {IWSMessage, IWSRequest} from "./ws.types";

export const useWsServer = () => {
    const wsPort = process.env.WS_PORT || '';
    const wsServer = new WebSocket.Server({ port: +wsPort });

    wsServer.on('connection', async (wsClient) => {
        console.log('WebSocket server opened.')

        wsClient.on('message', async (received, isBinary) => {

            const message: IWSMessage = JSON.parse(received.toString());

            if (message) {
                switch (message.type) {
                    case "request":
                        const request = message.payload as IWSRequest;

                        const section = request.section;
                        const action = request.action;

                        if (section && action) {
                            switch (section) {
                                case 'canvas-item':
                                    await useCanvasItemWs(request, wsClient, wsServer);
                                    break;
                            }
                        }
                        break;

                    case "response":

                        break;
                }
            }
        })
    })

    wsServer.on('close', () => {
        console.log('WebSocket server closed.')
    })
}