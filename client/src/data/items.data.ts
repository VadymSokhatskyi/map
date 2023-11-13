import { EBuildingTypes, EInfrastructureTypes, ETransportTypes } from "../types/item.types";
import {EItemCategories} from "../types/item.types";

export const ITEMS = {
    [EItemCategories.building]: {
        [EBuildingTypes.house]: {
            'default': {
                name: 'item_building_house_default',
                category: EItemCategories.building,
                width: 10000,
                height: 5000,
            }
        },
    },

    [EItemCategories.infrastructure]: {
        [EInfrastructureTypes.road]: {
            'default': {
                name: 'item_infrastructure_road_default',
                category: EItemCategories.infrastructure,
                width: 28000,
                height: 7600,
            },
        },
    },

    [EItemCategories.transport]: {
        [ETransportTypes.car]: {
            'default': {
                name: 'item_transport_car_default',
                category: EItemCategories.transport,
                width: 4700,
                height: 2130,
                options: {
                    color: 'gray',
                }
            },
        },
    }
}