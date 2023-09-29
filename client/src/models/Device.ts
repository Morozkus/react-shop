export interface IType {
    id: number,
    name: string
}

export interface IBrand {
    id: number,
    name: string
}

export interface IDevice {
    id: number,
    name: string,
    price: number,
    rating: number,
    img: string,
    typeId: number,
    brandId: number,
    info: INFO[]
}

export interface IPostDevice {
    name: string,
    price: number,
    img: Blob,
    typeId: number,
    brandId: number,
    info: INFO[]
}

export interface Types {
    id: number,
    name: string
}

export interface Brands {
    id: number,
    name: string
}

export interface INFO {
    title: string,
    description: string,
    number: number
}