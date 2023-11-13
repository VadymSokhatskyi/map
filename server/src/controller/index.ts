import { Request, Response } from 'express';

export const getIndexController = (req: Request, res: Response) => {
    res.send('Hello from index!')
}