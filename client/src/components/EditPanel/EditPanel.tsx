import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import { v4 } from 'uuid';

import Canvas from "../Canvas/Canvas";
import Button from "../Button/Button";

import {useCanvasItemApi} from "../../api/ws/useCanvasItemApi";

import {IItem} from "../../types/item.types";
import {ICanvasItem, TCanvasCenter} from "../../types/canvas.types";

import './EditPanel.css';

type TEditPanelProps = {
    selectedCatalogItem: IItem | null;
    editedCanvasItems: ICanvasItem[];
    setEditedCanvasItems: Dispatch<SetStateAction<ICanvasItem[]>>;
    mapCenter: TCanvasCenter;
}

const EditPanel = (props: TEditPanelProps) => {

    const {
        selectedCatalogItem,
        editedCanvasItems,
        setEditedCanvasItems,
        mapCenter,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [editCenter, setEditCenter] = useState<{ x: number; y: number; }>({ x: 0, y: 0 })

    const canvasContainerRef = useRef<HTMLDivElement>(null);

    const { saveCanvasItemApi } = useCanvasItemApi();

    useEffect(() => {
        if (selectedCatalogItem) {
            const { name } = selectedCatalogItem;
            setEditedCanvasItems([{...selectedCatalogItem, id: name, x: 0, y: 0, isActive: false }])
        } else {
            setEditedCanvasItems([]);
        }
    }, [selectedCatalogItem]);

    const handleAddToMap = async () => {
        if (editedCanvasItems.length) {
            const canvasItem = editedCanvasItems[0];
            if (canvasItem) {
                const formattedCanvasItem = { ...canvasItem };
                formattedCanvasItem.id = formattedCanvasItem.id + '__' + v4();
                formattedCanvasItem.x = -mapCenter.x;
                formattedCanvasItem.y = -mapCenter.y;

                const { name, category, width, height } = formattedCanvasItem;

                const data = { name, category, width, height };

                const toSave = {
                    id: formattedCanvasItem.id,
                    x: formattedCanvasItem.x,
                    y: formattedCanvasItem.y,
                    userId: '',
                    data: JSON.stringify(data)
                }

                saveCanvasItemApi(toSave as any);
            }
        }
    }

    const collapse = isCollapsed ? '<' : '>';

    const collapsedClass = isCollapsed ? 'editPanel--collapsed' : '';

    return(
        <div className={`editPanel ${collapsedClass}`}>

            <div className="editPanel__collapseButton" onClick={() => setIsCollapsed(!isCollapsed)}>
                {collapse}
            </div>

            <div className="editPanel__header">
                {selectedCatalogItem?.name || ''}
            </div>
            <div className="editPanel__canvas" ref={canvasContainerRef} style={{ border: `1px solid ${selectedCatalogItem ? 'white' : 'gray'}` }}>
                {editedCanvasItems.length ? (
                    <Canvas
                        isEdit={false}
                        containerRef={canvasContainerRef}
                        width={380}
                        height={190}
                        center={editCenter}
                        setCenter={setEditCenter}
                        canvasItems={editedCanvasItems}
                        setCanvasItems={() => {}}
                        activeCanvasItem={null}
                        setActiveCanvasItem={() => {}}
                        autoScaleInitial
                        backgroundColor="rgba(0, 0, 0, 0)"
                    />
                ) : <></>}
            </div>

            <div className="editPanel__addButton">
                <Button text="Add to map" opacity={0.2} onClick={handleAddToMap} isDisabled={!selectedCatalogItem} />
            </div>

        </div>
    )
}

export default EditPanel;