

export interface LoginUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    isHost: boolean
}

export interface GoodSpotImage{
    id:number,
    spotId: number,
    url: string,
    preview: boolean
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
    spotImage?: GoodSpotImage
}


export interface PaginationValues{
    limit?: number,
    offset?: number
}

export interface WhereValues{
    lat?: any,
    lng?: any,
    price?: any
}
