import { createContext } from "react";
import { PostReviewModalContext } from "../typings/modal";

const defaultState: PostReviewModalContext = {
    open: false,
    togglePostReviewOpen: () => console.log('toggling')
}

const NewReviewModalContext = createContext(defaultState);

export default NewReviewModalContext;