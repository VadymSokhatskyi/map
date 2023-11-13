import React, {useState} from 'react';

import CatalogItem from "./CatalogItem";

import {IItem} from "../../types/item.types";

import {ITEMS} from "../../data/items.data";

import './Catalog.css';

export type TCatalogProps = {
    selectedCatalogItem: IItem | null;
    setSelectedCatalogItem: (item: IItem | null) => void;
}

const Catalog = (props: TCatalogProps) => {

    const {
        selectedCatalogItem,
        setSelectedCatalogItem,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const text = !isCollapsed ? '<' : '>';

    const collapsedClass = isCollapsed ? 'catalog--collapsed' : '';

    return(
        <div className={`catalog ${collapsedClass}`}>

            <div className="catalog__collapseButton" onClick={() => setIsCollapsed(!isCollapsed)}>
                {text}
            </div>

            {Object.entries(ITEMS).map( ([name, children]) => {
                return (
                    <CatalogItem
                        name={name}
                        children={children}
                        marginLeft={0}
                        depthIndex={0}
                        selectedCatalogItem={selectedCatalogItem}
                        setSelectedCatalogItem={setSelectedCatalogItem}
                    />
                )
            } )}
        </div>
    )
}

export default Catalog;