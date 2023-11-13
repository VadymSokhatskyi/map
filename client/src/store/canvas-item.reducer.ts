import { createSlice } from '@reduxjs/toolkit'
import {ICanvasItem} from "../types/canvas.types";

export const canvasItemSlice = createSlice({
    name: 'canvas-item',
    initialState: {
        items: [],
        isInit: false,
    },
    reducers: {
        setCanvasItem: (state, action) => {
            state.items = action.payload;
        },
        setIsMapInit: (state, action) => {
            state.isInit = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCanvasItem, setIsMapInit } = canvasItemSlice.actions

export const getIsMapInit = (state: any) => state.canvasItem.isInit;

export default canvasItemSlice.reducer