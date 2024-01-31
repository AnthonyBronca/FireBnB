import { Review, Spot } from "./redux";

export interface IReviewProps{
    reviews: Review[] | undefined,
    spot: Spot
}
