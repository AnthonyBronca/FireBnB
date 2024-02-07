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
                <div id="exit-parent">
                    <span onClick={handleOpen} id="nr-exit-btn">
                        X
                    </span>
                </div>
                <div id="nrm-header">
                    <h1>Write a public review</h1>
                    <p>Tell the next guests what you loved, and anything else about this place.</p>
                </div>
                <div>Input box</div>
                <div>stars</div>
                <div>submit btn</div>
            </div>
        </section>
    )
}

export default NewReviewModal;
