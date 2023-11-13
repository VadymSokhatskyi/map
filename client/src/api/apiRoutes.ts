export const API_ROUTES = {
    CANVAS_ITEM_GET: '/canvas-item',
    CANVAS_ITEM_SAVE: '/canvas-item',
    CANVAS_ITEM_UPDATE: '/canvas-item',
    CANVAS_ITEM_DELETE: (id: string) => `/canvas-item/${id}`,
}