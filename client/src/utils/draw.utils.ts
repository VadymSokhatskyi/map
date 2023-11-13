import {TDrawCanvasItemProps, TDrawGridProps, TDrawMapProps} from "../types/canvas.types";

export const DRAW_FUNCTIONS_MAP: Record<string, (props: TDrawCanvasItemProps) => void> = {
    'item_building_house_default': draw_houseDefault,
    'item_infrastructure_road_default': draw_roadDefault,
    'item_transport_car_default': draw_carDefault,
};

export const drawItem = (props: TDrawCanvasItemProps) => {
    const {name} = props;
    const draw = DRAW_FUNCTIONS_MAP[name];
    draw && draw(props);
}

const drawActive = (props: TDrawCanvasItemProps) => {

    const {
        canvasContext,
        center,
        coords,
        width,
        height,
    } = props;

    if (canvasContext) {
        const { x: centerX, y: centerY } = center;
        const { x: itemX, y: itemY } = coords;

        canvasContext.fillStyle = 'rgba(255, 255, 255, 0.5)';
        canvasContext.fillRect(centerX + itemX - 500, centerY + itemY - 500, width + 1000, height + 1000)
    }
}

export const drawMap = (props: TDrawMapProps) => {

    const {
        canvasContext,
        center,
        canvasItems,
        activeCanvasItem,
        mapSize,
        withGrid,
        backgroundColor,
    } = props;

    if (canvasContext) {
        canvasContext.clearRect(0, 0, mapSize, mapSize);

        /** Background */
        canvasContext.fillStyle = backgroundColor || '#A9DFBF';
        canvasContext.fillRect(center.x - mapSize, center.y - mapSize, mapSize * 2, mapSize * 2);

        withGrid && drawGrid({ canvasContext, mapSize, gridSize: 1000, center });

        canvasItems.forEach( (item) => {
            const { name, x: itemX, y: itemY, width, height } = item;
            const isActive = activeCanvasItem?.id === item.id;
            drawItem({name, canvasContext, center, coords: { x: itemX, y: itemY }, width, height, isActive})
        } )
    }
}

export const drawGrid = (props: TDrawGridProps) => {

    const {
        canvasContext,
        mapSize,
        gridSize,
        center,
    } = props;

    if (canvasContext) {
        const width = mapSize;
        const height = mapSize;

        if (width && height) {
            canvasContext.beginPath();
            for (let x = center.x - mapSize; x <= width; x += gridSize) {
                canvasContext.moveTo(x, 0);
                canvasContext.lineTo(x, height);
            }
            for (let y = center.y - mapSize; y <= height; y += gridSize) {
                canvasContext.moveTo(0, y);
                canvasContext.lineTo(width, y);
            }
            canvasContext.lineWidth = 10;
            canvasContext.strokeStyle = 'blue';
            canvasContext.stroke();
            canvasContext.closePath();
        }
    }
}

export function draw_houseDefault (props: TDrawCanvasItemProps) {

    const {
        canvasContext,
        center,
        coords,
        width,
        height,
        isActive,
    } = props;

    if (canvasContext) {
        const { x: centerX, y: centerY } = center;
        const { x: itemX, y: itemY } = coords;

        canvasContext.fillStyle = '#F5B041';
        canvasContext.fillRect(centerX + itemX, centerY + itemY, width, height);
        canvasContext.fillStyle = 'black';
        canvasContext.strokeRect(centerX + itemX, centerY + itemY, width, height);
        for (let xx = centerX + itemX; xx < centerX + itemX + width; xx = xx + 500) {
            canvasContext.strokeRect(xx, centerY + itemY, 500, 2400)
        }
        for (let xx = centerX + itemX; xx < centerX + itemX + width; xx = xx + 500) {
            canvasContext.strokeRect(xx, centerY + itemY + 2600, 500, 2400)
        }

        if (isActive) drawActive(props)
    }
}

export function draw_roadDefault (props: TDrawCanvasItemProps) {

    const {
        canvasContext,
        center,
        coords,
        width,
        height,
        isActive,
    } = props;

    if (canvasContext) {
        const { x: centerX, y: centerY } = center;
        const { x: itemX, y: itemY } = coords;

        canvasContext.fillStyle = '#424949';
        canvasContext.fillRect(centerX + itemX, centerY + itemY, width, height);
        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(centerX + itemX, centerY + itemY + 1000, width, 200);
        for (let xx = centerX + itemX; xx < centerX + itemX + width; xx = xx + 4000) {
            canvasContext.fillRect(xx, centerY + itemY + 3700, 2000, 200);
        }
        canvasContext.fillRect(centerX + itemX, centerY + itemY + 6400, width, 200);

        if (isActive) drawActive(props)
    }
}

export function draw_carDefault (props: TDrawCanvasItemProps) {

    const {
        canvasContext,
        center,
        coords,
        width,
        height,
        isActive,
    } = props;

    if (canvasContext) {
        const { x: centerX, y: centerY } = center;
        const { x: itemX, y: itemY } = coords;

        canvasContext.fillStyle = '#5DADE2';
        canvasContext.fillRect(centerX + itemX, centerY + itemY, width, height)
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(centerX + itemX + 1500, centerY + itemY, 1000, 2130)
        canvasContext.fillRect(centerX + itemX + 3500, centerY + itemY, 700, 2130)

        if (isActive) drawActive(props)
    }
}