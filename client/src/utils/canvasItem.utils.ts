import {ICanvasItem} from "../types/canvas.types";
import {IDatabaseCanvasItem} from "../types/api/canvas-item.api.types";

export const getParsedCanvasItems = (canvasItems: IDatabaseCanvasItem[]): ICanvasItem[] => {
    return canvasItems.map( (item) => {
    const { id, x, y, data } = item;
    const parsedData = JSON.parse(data);
    const { name, category, width, height } = parsedData;
    return {
        name,
        category,
        width,
        height,
        id,
        x,
        y,
        isActive: false,
    }
} )
}