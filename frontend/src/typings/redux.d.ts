

export interface CSRFHttpOptions {
    method: string;
    headers: any;
    body?: string;
};

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string
    username: string,
}

export interface Spot {
    id: number,
    ownerId: number,
    address: string,
    city: string,
    state: string,
    country: string,
    description: string,
    avgRating: number,
    price: number,
    lat: number,
    lng: number,
    previewImage: string,
    createdAt: string
    updatedAt: string
}


export interface Spots{
    spots: Spot[]
}


export interface SessionInitialState {
    user: null | User
}

export interface SpotInitialState {
    spots: null | Spot[]
}

export interface SignUpUser {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}
