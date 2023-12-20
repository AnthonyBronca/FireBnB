export interface IReview {
    createdAt: string;
    id: number;
    review: string;
    spotId: number;
    stars: number;
    updatedAt: string;
    userId: number
}

export interface IReviewProps{
    reviews: IReview[]
}


export interface IReviewProp{
    createdAt: string;
    id: number;
    review: string;
    spotId: number;
    stars: number;
    updatedAt: string;
    userId: number
}
