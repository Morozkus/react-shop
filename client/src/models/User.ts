export interface IUser {
    email: string,
    password: string
}

export interface IDataUser {
    token: string,
    basket: IBasket,
    message?: string
}

export interface IBasket {
    id: number,
    userId: number
}