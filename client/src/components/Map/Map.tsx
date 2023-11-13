import React, {RefObject, useEffect, useRef, useState} from 'react';

import Canvas from "../Canvas/Canvas";
import Catalog from "../Catalog/Catalog";
import EditPanel from "../EditPanel/EditPanel";

import {useMapState} from "../../hooks/useMapState";

import {IItem} from "../../types/item.types";
import {ICanvasItem, TCanvasCenter} from "../../types/canvas.types";

import './Map.css';

export type TMapProps = {
    wrapRef: RefObject<HTMLDivElement>;
}

const Map = (props: TMapProps) => {

    const { wrapRef } = props;

    const {
        canvasItems,
        setCanvasItems,
    } = useMapState();

    const [selectedCatalogItem, setSelectedCatalogItem] = useState<IItem | null>(null);
    const [editedCanvasItems, setEditedCanvasItems] = useState<ICanvasItem[]>([]);

    const [mapWidth, setMapWidth] = useState(wrapRef?.current?.clientWidth || 1000);
    const [mapHeight, setMapHeight] = useState(wrapRef?.current?.clientHeight || 500)

    const [center, setCenter] = useState<TCanvasCenter>({ x: 0, y: 0 });

    const [activeCanvasItem, setActiveCanvasItem] = useState<ICanvasItem | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            setMapWidth(window.innerWidth - 48);
            setMapHeight(window.innerHeight - 48);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize)
    }, []);

    return(
        <div className="map" ref={mapRef} style={{ width: mapWidth, height: mapHeight }}>
            <Catalog
                selectedCatalogItem={selectedCatalogItem}
                setSelectedCatalogItem={setSelectedCatalogItem}
            />
            <Canvas
                isEdit={true}
                containerRef={mapRef}
                width={mapWidth}
                height={mapHeight}
                center={center}
                setCenter={setCenter}
                canvasItems={canvasItems}
                setCanvasItems={setCanvasItems}
                activeCanvasItem={activeCanvasItem}
                setActiveCanvasItem={setActiveCanvasItem}
                autoScaleInitial
                withGrid
            />
            <EditPanel
                selectedCatalogItem={selectedCatalogItem}
                editedCanvasItems={editedCanvasItems}
                setEditedCanvasItems={setEditedCanvasItems}
                mapCenter={center}
            />
        </div>
    )
}

export default Map;