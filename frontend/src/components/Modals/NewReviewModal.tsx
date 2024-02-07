import React, { useContext, useEffect } from 'react';
import './css/NewReviewModalStyles.css'
//import { useAppSelector } from '../../store';

import NewReviewModalContext from '../../context/NewReviewModalContext';
import { TextareaAutosize } from '@mui/material';

interface INewReviewProps {
    spotId: number
}

const NewReviewModal: React.FC<INewReviewProps> = ({ spotId }):JSX.Element => {
    const {togglePostReviewOpen } = useContext(NewReviewModalContext);

    const handleClose = () => {
        togglePostReviewOpen(true)
    }

    useEffect(()=> {
        const loginmodal = document.getElementById('new-review-modal');
        if(loginmodal){
            loginmodal.addEventListener('click', (e)=> {
                if(e.target !== null){
                    if(e.target === e.currentTarget){
                        handleClose();
                    }
                }
            })
        }
    })

    return (
        <section id="new-review-modal">
            <div id="nr-modal-content">
                <div id="exit-parent">
                    <span onClick={handleClose} id="nr-exit-btn">
                        X
                    </span>
                </div>
                <div id="nrm-header">
                    <h1>Write a public review</h1>
                    <p>Tell the next guests what you loved, and anything else about this place.</p>
                </div>
                <form id="review-form">
                    <TextareaAutosize
                        id="rvw-txt-area"
                        minRows={4}
                        placeholder='How was your stay?'
                    />
                    <div id="review-stars">
                        1 2 3 4 5
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </section>
    )
}

export default NewReviewModal;
