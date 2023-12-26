

export interface CSRFHttpOptions {
    method: string;
    headers: any;
    body?: string | FormData;
};

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    isHost: boolean;
}

export interface SpotImage {
    id: number,
    preview: boolean,
    spotId: number,
    url: string
}

export interface SpotOwner {
    id: number,
    firstName: string,
    isHost: null | boolean,
    lastName: string,
    username: string
}


export interface Review {
    id: number,
    review: string,
    spotId: number,
    stars: number,
    createdAt: string | Date,
    updatedAt: string | Date,
    userId: number
}

export interface Spot {
    id: number;
    ownerId: number;
    address: string;
    city: string;
    state: string;
    country: string;
    description: string;
    avgRating: number;
    name: string;
    price: number;
    lat: number;
    lng: number;
    previewImage: string;
    createdAt: string;
    updatedAt: string;
    SpotImages: SpotImage[]
    Owner?: SpotOwner,
    reviews?: Review[]
}

export interface Like {
    id: number;
    userId: number;
    spotId: number;
    Spot: Spot
}

export interface LikeRes {
    like: Like,
    Spot: Spot
}


export interface Spots{
    spots: Spot[];
}

export interface Likes {
    likes: Like[];
}

export interface LikeSpot {
  [id:number|string]: Spot
}


export interface SessionInitialState {
    user: null | User;
}


export interface SpotId {
    [id:number|string]: Spot;
}
export interface LikeId {
    [id:number|string]: Like
}


export interface SpotInitialState {
    byId: SpotId | null;
    allSpots: Spot[] | null;
}


export interface LikeInitialState {
    byId: SpotId | null;
    allLikes: Like[] | null;
}


export interface SignUpUser {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    isHost: boolean;
    password: string;
}

export interface INewSpotForm {
    listingName: string | null;
    streetAddress: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    description: string | null;
    price:  string | null;
    imgUrl: string | null;
    lat?: number | string | null;
    lng?: number | string | null;
}
