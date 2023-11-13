import useWebSocket from "react-use-websocket";

import store from "../../store/store";
import {setCanvasItem, setIsMapInit} from "../../store/canvas-item.reducer";

import {getParsedCanvasItems} from "../../utils/canvasItem.utils";

import {IWSMessage, IWSRequest} from "../../types/api/ws.api.types";


export const useWebSocketApi = () => {

    const { sendMessage } = useWebSocket('ws://localhost:3002', {
        onOpen: () => {
            console.log('WebSocket opened')
        },
        onMessage: (event) => {

            const message: IWSMessage = JSON.parse(event.data);

            switch (message.type) {
                case "request":
                    const request = message.payload as IWSRequest;

                    const section = request.section;
                    const action = request.action;

                    if (section && action) {
                        switch (section) {
                            case 'canvas-item':
                                switch (action) {
                                    case 'update-map':
                                        const updatedCanvasItems = getParsedCanvasItems(request.data);
                                        store.dispatch(setCanvasItem(updatedCanvasItems))
                                        if (!store.getState().canvasItem.isInit) store.dispatch(setIsMapInit(true));
                                        break;
                                }
                                break;
                        }
                    }
                    break;

                case "response":

                    break;
            }
        }
    });

    const sendWsMessage = (message: IWSMessage) => {
        sendMessage(JSON.stringify(message))
    };

    return {
        sendWsMessage,
    }
}