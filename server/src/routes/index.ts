import Router from 'express';
import {getIndexController} from "../controller";
import {canvasItemController} from "../controller/canvas-item.controller";

export const router = Router();

router.get('/', getIndexController);
router.use('/canvas-item', canvasItemController)
