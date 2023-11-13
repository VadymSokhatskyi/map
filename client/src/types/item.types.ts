export interface IItem {
    name: string;
    category: EItemCategories;
    options?: any;
    width: number;
    height: number;
}

export enum EItemCategories {
    building = 'building',
    infrastructure = 'infrastructure',
    transport = 'transport',
}

export interface IBuilding {
    buildingType: EBuildingTypes;
}

export enum EBuildingTypes {
    house = 'house'
}

export interface IInfrastructure extends IItem {
    infrastructureType: EInfrastructureTypes;
}

export enum EInfrastructureTypes {
    road = 'road',
}

export interface ITransport extends IItem {
    transportType: ETransportTypes;
}

export enum ETransportTypes {
    car = 'car',
}

