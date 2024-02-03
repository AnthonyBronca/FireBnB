import React, { useContext } from 'react';
//import { useAppSelector } from '../../store';

import NewReviewModalContext from '../../context/NewReviewModalContext';

interface INewReviewProps {
    spotId: number
}

const NewReviewModal: React.FC<INewReviewProps> = ({ spotId }):JSX.Element => {
    const {togglePostReviewOpen } = useContext(NewReviewModalContext);
    const handleOpen = () => {
        togglePostReviewOpen(true)
    }

    return (
        <section id="new-review-modal">
            <span onClick={handleOpen}>
                NEW REVIEW MODAL!!!
                </span>
            <p>{spotId}</p>
        </section>
    )
}

export default NewReviewModal;
