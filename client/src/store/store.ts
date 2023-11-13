import { configureStore } from '@reduxjs/toolkit'
import canvasItemReducer from "./canvas-item.reducer";

export default configureStore({
    reducer: {
        canvasItem: canvasItemReducer,
    },
})