import { Request, Response } from 'express';
import {
    getAllCanvasItemsService,
    getOneCanvasItemByIdService,
    saveCanvasItemService,
    updateCanvasItemService,
    deleteCanvasItemService,
} from "../service/canvas-item.service";

export const canvasItemController = async (req: Request, res: Response, next: any) => {
    const method = req.method;
    const id = req.path.split('/')[1];

    switch (method) {
        case 'GET':
            const pathname = req.path;
            switch (pathname) {
                case '/':
                    await getAllCanvasItemsController(req, res);
                    break;
                default:
                    req.params.id = id;
                    await getOneCanvasItemById(req, res);
                    break;
            }
            break;

        case 'POST':
            await saveCanvasItemController(req, res);
            break;

        case 'PUT':
            await updateCanvasController(req, res);
            break;

        case 'DELETE':
            req.params.id = id;
            await deleteCanvasItemController(req, res);
            break;

        // case 'OPTIONS':
        //     await optionsCanvasItemController(req, res, next);
        //     break;

        default:
            return;
    }
}

export const getAllCanvasItemsController = async (req: Request, res: Response) => {
    const canvasItems = await getAllCanvasItemsService();
    res.send(canvasItems);
}

export const getOneCanvasItemById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const canvasItem = getOneCanvasItemByIdService(id);
    res.send(canvasItem);
}

export const saveCanvasItemController = async (req: Request, res: Response) => {
    const payload = req.body;
    const response = await saveCanvasItemService(payload);
    res.send(response);
}

export const updateCanvasController = async (req: Request, res: Response) => {
    const updates = req.body;
    const response = await updateCanvasItemService(updates);
    res.send(response);
}

export const deleteCanvasItemController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = await deleteCanvasItemService(id);
    res.send(response);
}

// export const optionsCanvasItemController = async (req: Request, res: Response, next: any) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     res.send(200);
//     next()
// }