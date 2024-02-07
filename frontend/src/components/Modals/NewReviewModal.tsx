import React, { useContext } from 'react';
import './css/NewReviewModalStyles.css'
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
            <div id="nr-modal-content">
                <span onClick={handleOpen}>
                    X
                </span>
                <div>
                    <p>Write a public review</p>
                    <p>Tell the next guests what you loved, and anything else about this place.</p>
                </div>
                <p>{spotId}</p>
            </div>
        </section>
    )
}

export default NewReviewModal;
