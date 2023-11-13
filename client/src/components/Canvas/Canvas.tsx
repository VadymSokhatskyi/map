import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';

import {useSelector} from "react-redux";
import {getIsMapInit} from "../../store/canvas-item.reducer";

import CanvasControls from "./CanvasControls";

import {useCanvasItemApi} from "../../api/ws/useCanvasItemApi";
import {drawMap} from "../../utils/draw.utils";

import {ICanvasItem, TCanvasCenter} from "../../types/canvas.types";

import {MAP_SIZE, SCALE_STEP, ZOOM_IN_STEP, ZOOM_OUT_STEP} from './canvas.data';

import './Canvas.css';

type TCanvasProps = {
    isEdit: boolean;
    containerRef: React.RefObject<any>;
    width: number;
    height: number;
    center: TCanvasCenter;
    setCenter: Dispatch<SetStateAction<{ x: number; y: number; }>>
    canvasItems: ICanvasItem[];
    setCanvasItems: (canvasItems: ICanvasItem[]) => void;
    activeCanvasItem: ICanvasItem | null;
    setActiveCanvasItem: Dispatch<SetStateAction<ICanvasItem | null>>;
    initialZoomOut?: number;
    autoScaleInitial?: boolean;
    withGrid?: boolean;
    backgroundColor?: string;
}



const Canvas = (props: TCanvasProps) => {

    const {
        isEdit,
        containerRef,
        width,
        height,
        center,
        setCenter,
        canvasItems,
        setCanvasItems,
        activeCanvasItem,
        setActiveCanvasItem,
        initialZoomOut,
        autoScaleInitial,
        withGrid,
        backgroundColor,
    } = props;

    const isMapInit = useSelector(getIsMapInit);

    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null);

    const [viewSize, setViewSize] = useState<{width: number, height: number}>(
        { width, height }
    );
    const [scale, setScale] = useState<number>(1);

    const [isMoved, setIsMoved] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const { updateCanvasItemApi } = useCanvasItemApi();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect( () => {
        if (containerRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            setCanvasContext(context);
            drawMap({
                canvasContext,
                center,
                canvasItems,
                activeCanvasItem,
                mapSize: MAP_SIZE,
                withGrid,
                backgroundColor,
            });
        }
    }, [containerRef, canvasRef] )

    useEffect( () => {
        drawMap({
            canvasContext,
            center,
            canvasItems,
            activeCanvasItem,
            mapSize: MAP_SIZE,
            withGrid,
            backgroundColor,
        })
    }, [canvasItems, activeCanvasItem] )

    useEffect( () => {
        if (initialZoomOut) {
            for (let i = 1; i <= initialZoomOut; i++) {
                handleZoomOut();
            }
        }
    }, [initialZoomOut] )

    useEffect( () => {
        if (autoScaleInitial && canvasItems.length && canvasContext) {
            handleAutoScale();
        }
    }, [isMapInit, canvasContext] );

    const handleAutoScale = () => {
        if (canvasItems.length) {
            const { x, y, width, height } = canvasItems[0];

            let leftX = x;
            let rightX = x + width;

            let topY = y;
            let bottomY = y + height;

            canvasItems.forEach( (item) => {
                const { x, y, width, height } = item;
                leftX = Math.min(leftX, x);
                rightX = Math.max(rightX, x + width);
                topY = Math.min(topY, y);
                bottomY = Math.max(bottomY, y + height);
            } )

            const differenceX = rightX - leftX;
            const differenceY = bottomY - topY;

            let updatedViewSize = {...viewSize};

            if (updatedViewSize.width < differenceX || updatedViewSize.height < differenceY) {
                while (updatedViewSize.width < differenceX || updatedViewSize.height < differenceY) {
                    updatedViewSize = { width: updatedViewSize.width * ZOOM_OUT_STEP, height: updatedViewSize.height * ZOOM_OUT_STEP }
                    handleZoomOut();
                }
            } else if (updatedViewSize.width > differenceX || updatedViewSize.height > differenceY) {
                while (updatedViewSize.width > differenceX || updatedViewSize.height > differenceY) {
                    updatedViewSize = { width: updatedViewSize.width * ZOOM_IN_STEP, height: updatedViewSize.height * ZOOM_IN_STEP }
                    handleZoomIn();
                }
            }

            setTimeout( () => {
                const x = -leftX + ((updatedViewSize.width - differenceX) / 2)
                const y = -(topY) + ((updatedViewSize.height - differenceY) / 2);
                setCenter({ x, y })
                drawMap({
                    canvasContext,
                    center: { x, y },
                    canvasItems,
                    activeCanvasItem,
                    mapSize: MAP_SIZE,
                    withGrid,
                    backgroundColor,
                });
            }, 0 )
        }
    }

    const handleZoomIn = () => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.scale(1 + SCALE_STEP, 1 + SCALE_STEP);
            setScale( (currentScale) => currentScale * 1.1);
            setViewSize((currentViewSize) => {
                setCenter( (currentCenter) => {
                    const updatedCenter = {...currentCenter};
                    updatedCenter.x -= viewSize.width * 0.1;
                    updatedCenter.y -= viewSize.height * 0.1;
                    drawMap({
                        canvasContext,
                        center: updatedCenter,
                        canvasItems,
                        activeCanvasItem,
                        mapSize: MAP_SIZE,
                        withGrid,
                        backgroundColor,
                    });
                    return updatedCenter;
                } )
                return ({width: currentViewSize.width * 0.9, height: currentViewSize.height * 0.9})
            });
        }
    }

    const handleZoomOut = () => {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
            context.scale(1 - SCALE_STEP, 1 - SCALE_STEP);
            setScale((currentScale) => currentScale * 0.9);
            setViewSize((currentViewSize) => {
                setCenter( (currentCenter) => {
                    const updatedCenter = {...currentCenter};
                    updatedCenter.x += currentViewSize.width * 0.1;
                    updatedCenter.y += currentViewSize.height * 0.1;
                    drawMap({
                        canvasContext,
                        center: updatedCenter,
                        canvasItems,
                        activeCanvasItem,
                        mapSize: MAP_SIZE,
                        withGrid,
                        backgroundColor,
                    });
                    return updatedCenter;
                } )
                return ({width: currentViewSize.width * 1.1, height: currentViewSize.height * 1.1})
            });
        }
    }

    const handleWheel = (event: React.WheelEvent) => {
        if (isEdit) {
            const deltaY = event.deltaY;
            if (deltaY > 0) handleZoomIn();
            if (deltaY < 0) handleZoomOut();
        }
    }

    const handleMouseDown = () => {
        if (isEdit) {
            setIsTouched(true);
        }
    }

    const handleMouseUp = (event: React.MouseEvent) => {
        if (isEdit && containerRef.current) {
            const clickX = (event.clientX - containerRef.current.offsetLeft) / scale;
            const clickY = (event.clientY - containerRef.current.offsetTop) / scale;

            const itemsToSelect = canvasItems.filter( (item) => (
                item.x + center.x < clickX &&
                item.x + center.x + item.width > clickX &&
                item.y + center.y < clickY &&
                item.y + center.y + item.height > clickY
            ) )

            const itemToSelect = itemsToSelect.length ? itemsToSelect[itemsToSelect.length - 1] : null;

            if (!isMoved) {
                if (itemToSelect) {
                    if (itemToSelect.id === activeCanvasItem?.id) {
                        setActiveCanvasItem(null)
                        const updatedCanvasItems = canvasItems.map( (item) => {
                            if (item.id === itemToSelect.id) {
                                return {...item, isActive: false}
                            } else {
                                return item;
                            }
                        } )
                        setCanvasItems(updatedCanvasItems);
                    } else {
                        setActiveCanvasItem(itemToSelect);
                        const updatedCanvasItems = canvasItems.map( (item) => {
                            if (item.id === itemToSelect.id) {
                                return {...item, isActive: true}
                            } else {
                                return item;
                            }
                        } )
                        setCanvasItems(updatedCanvasItems);
                    }
                } else if (activeCanvasItem) {
                    setActiveCanvasItem(null);
                    const updatedCanvasItems = canvasItems.map( (item) => {
                        if (item.id === activeCanvasItem?.id) {
                            return {...item, isActive: false}
                        } else {
                            return item;
                        }
                    } )
                    setCanvasItems(updatedCanvasItems);
                }
            }
        }

        setIsTouched(false);
        setIsMoved(false);
    }

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isEdit && isTouched && containerRef.current) {
            setIsMoved(true);

            const clickX = (event.clientX - containerRef.current.offsetLeft) / scale;
            const clickY = (event.clientY - containerRef.current.offsetTop) / scale;

            const itemsToSelect = canvasItems.filter( (item) => (
                item.x + center.x < clickX &&
                item.x + center.x + item.width > clickX &&
                item.y + center.y < clickY &&
                item.y + center.y + item.height > clickY
            ) )

            const itemToSelect = itemsToSelect.length ? itemsToSelect[itemsToSelect.length - 1] : null;

            if (itemToSelect && activeCanvasItem && itemToSelect?.id === activeCanvasItem?.id) {
                const movementX = event.movementX / scale;
                const movementY = event.movementY / scale;

                const itemX = activeCanvasItem.x + movementX;
                const itemY = activeCanvasItem.y + movementY;

                const updatedCanvasItems = canvasItems.map( (item) => {
                    if (item.id === activeCanvasItem.id) {
                        return {...item, x: itemX, y: itemY};
                    } else {
                        return item;
                    }
                } )
                setCanvasItems(updatedCanvasItems);
                setActiveCanvasItem({...activeCanvasItem, x: itemX, y: itemY});
                updateCanvasItemApi({ id: activeCanvasItem.id, x: itemX, y: itemY });
            } else {

                const movementX = event.movementX / scale;
                const movementY = event.movementY / scale;

                const updatedCenter = {...center};

                updatedCenter.x += movementX;
                updatedCenter.y += movementY;
                setCenter(updatedCenter);
                drawMap({
                    canvasContext,
                    center: updatedCenter,
                    canvasItems,
                    activeCanvasItem,
                    mapSize: MAP_SIZE,
                    withGrid,
                    backgroundColor,
                });
            }
        }
    }



    return (
        <div className="canvas__wrap" style={{ width: `${width} px`, height: `${height} px` }}>
        <canvas
            id="canvas"
            className={`canvas ${isEdit ? 'canvas--edit' : ''}`}
            ref={canvasRef}
            width={width}
            height={height}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >

        </canvas>

            {isEdit && (
                <CanvasControls
                    scale={scale}
                    center={center}
                    setCenter={setCenter}
                    activeCanvasItem={activeCanvasItem}
                    setActiveCanvasItem={setActiveCanvasItem}
                    draw={(center: TCanvasCenter) => {
                        drawMap({
                            canvasContext,
                            center,
                            canvasItems,
                            activeCanvasItem,
                            mapSize: MAP_SIZE,
                            withGrid,
                            backgroundColor,
                        });
                    }}
                    handleAutoScale={handleAutoScale}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                />
            )}
        </div>
    )
}

export default Canvas;