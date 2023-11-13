import React, {Dispatch, SetStateAction} from 'react';

import Button from "../Button/Button";

import {useCanvasItemApi} from "../../api/ws/useCanvasItemApi";

import {ICanvasItem, TCanvasCenter} from "../../types/canvas.types";

import './Canvas.css';

type TCanvasControlsProps = {
    scale: number;
    center: { x: number, y: number };
    setCenter: Dispatch<SetStateAction<{ x: number, y: number }>>;
    activeCanvasItem: ICanvasItem | null;
    setActiveCanvasItem: Dispatch<SetStateAction<ICanvasItem | null>>;
    draw: (center: TCanvasCenter) => void;
    handleAutoScale: () => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
}

const CanvasControls = (props: TCanvasControlsProps) => {

    const {
        scale,
        center,
        setCenter,
        activeCanvasItem,
        setActiveCanvasItem,
        draw,
        handleAutoScale,
        handleZoomIn,
        handleZoomOut,
    } = props;

    const { deleteCanvasItemApi } = useCanvasItemApi();

    const handleDeleteItem = async () => {
        if (activeCanvasItem) {
            const { id } = activeCanvasItem;
            deleteCanvasItemApi(id);
            setActiveCanvasItem(null);
        }
    }

    const handleControlCenter = () => {
        handleAutoScale();
    }

    const handleControlUp = () => {
        const x = center.x;
        const y = center.y + 50 / scale;
        setCenter({ x, y });
        draw({x , y});
    }

    const handleControlRight = () => {
        const x = center.x - 50 / scale;
        const y = center.y;
        setCenter({ x, y });
        draw({x , y});
    }

    const handleControlLeft = () => {
        const x = center.x + 50 / scale;
        const y = center.y;
        setCenter({ x, y });
        draw({x , y});
    }

    const handleControlDown = () => {
        const x = center.x;
        const y = center.y - 50 / scale;
        setCenter({ x, y });
        draw({x , y});
    }

    return (
        <div className="canvas__controls">
            <div className="canvas__controlCenter">
                <Button text="o" opacity={0.7} onClick={handleControlCenter} />
            </div>

            <div className="canvas__controlUp">
                <Button text=">" opacity={0.7} onClick={handleControlUp} />
            </div>

            <div className="canvas__controlRight">
                <Button text=">" opacity={0.7} onClick={handleControlRight} />
            </div>

            <div className="canvas__controlDown">
                <Button text=">" opacity={0.7} onClick={handleControlDown} />
            </div>

            <div className="canvas__controlLeft">
                <Button text=">" opacity={0.7} onClick={handleControlLeft} />
            </div>

            <div className="canvas__controlMinus">
                <Button text="-" opacity={0.7} onClick={handleZoomOut} />
            </div>

            <div className="canvas__controlPlus">
                <Button text="+" opacity={0.7} onClick={handleZoomIn} />
            </div>

            <div className="canvas__controlRemove">
                <Button text="Remove" opacity={0.7} onClick={handleDeleteItem} isDisabled={!activeCanvasItem} />
            </div>
        </div>
    )
}

export default CanvasControls;