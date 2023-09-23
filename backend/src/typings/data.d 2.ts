

export interface LoginUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string
}


export interface GoodSpot{
    address: string,
    city: string,
    state: string,
    country: string,
    name: string,
    description: string,
    price: number,
    lat: number,
    lng: number,
    userId: number,
    id: number,
    createdAt: string,
    updatedAt: string,
}
