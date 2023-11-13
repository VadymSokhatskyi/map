import {useEffect} from "react";

import store from "../store/store";
import {setCanvasItem} from "../store/canvas-item.reducer";

import {useCanvasItemApi} from "../api/ws/useCanvasItemApi";
import {getParsedCanvasItems} from "../utils/canvasItem.utils";

import {ICanvasItem} from "../types/canvas.types";

export const useMapState = () => {

    const canvasItems = store.getState().canvasItem.items;

    const setCanvasItems = (canvasItems: ICanvasItem[]) => store.dispatch(setCanvasItem(canvasItems))

    const { getCanvasItemsApi } = useCanvasItemApi();

    useEffect(() => {
        getCanvasItemsApi();
    }, []);

    const updateMap = (canvasItems: any[]) => {
        const updatedCanvasItems: ICanvasItem[] = getParsedCanvasItems(canvasItems);
        setCanvasItems(updatedCanvasItems);
    }

    return {
        canvasItems,
        setCanvasItems,
        updateMap,
    }
}