import React, {useState} from 'react';

import {IItem} from "../../types/item.types";

import './Catalog.css';

type TCatalogItemProps = {
    name: string;
    children: any;
    marginLeft: number;
    depthIndex: number;
    selectedCatalogItem: IItem | null;
    setSelectedCatalogItem: (item: IItem | null) => void;
}

const CatalogItem = (props: TCatalogItemProps) => {

    const {
        name,
        children,
        marginLeft,
        depthIndex,
        selectedCatalogItem,
        setSelectedCatalogItem,
    } = props;

    const itemName = children.name;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleClick = () => {
        if (itemName) {
            setSelectedCatalogItem(null);
            setTimeout( () => setSelectedCatalogItem(!isActive ? children : null), 0 );
        } else {
            setIsExpanded(!isExpanded)
        }
    }

    const isActive = !!selectedCatalogItem && selectedCatalogItem.name === children?.name;

    return(
        <div
            className="catalogItem"
            style={{ marginLeft }}>
            <div
                className="catalogItemLabel"
                onClick={handleClick}
                style={isActive ? {
                    fontWeight: '600',
                    color: 'white',
                } : undefined}
            >
                {name}
            </div>
            {!children.name && isExpanded ?
                Object.entries(children).map( ([name, children]) => {
                    return (
                        <CatalogItem
                            name={name}
                            children={children}
                            marginLeft={32}
                            depthIndex={depthIndex + 1}
                            selectedCatalogItem={selectedCatalogItem}
                            setSelectedCatalogItem={setSelectedCatalogItem}
                        />
                    )
                } )
                :
                <></>
            }
        </div>
    );
}

export default CatalogItem;