import { IItem } from "./item.types";

export interface ICanvasItem extends IItem {
    id: string;
    x: number;
    y: number;
    isActive: boolean;
}

export type TCanvasCenter = {
    x: number;
    y: number;
}

export type TItemCoords = {
    x: number;
    y: number;
}

export type TDrawCanvasItemProps = {
    name: string;
    canvasContext: CanvasRenderingContext2D | null;
    center: TCanvasCenter;
    coords: TItemCoords;
    width: number;
    height: number;
    isActive: boolean;
}

export type TDrawMapProps = {
    canvasContext: CanvasRenderingContext2D | null;
    mapSize: number;
    center: TCanvasCenter;
    canvasItems: ICanvasItem[];
    activeCanvasItem: ICanvasItem | null;
    withGrid?: boolean;
    backgroundColor?: string;
}

export type TDrawGridProps = {
    canvasContext: CanvasRenderingContext2D | null;
    mapSize: number;
    gridSize: number;
    center: TCanvasCenter;
}