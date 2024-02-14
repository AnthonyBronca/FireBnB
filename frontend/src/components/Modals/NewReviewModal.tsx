import React, { useContext, useEffect } from 'react';
import './css/NewReviewModalStyles.css'
import star from '../../assets/icons/star.svg';
import emptyStar from '../../assets/icons/empty-star.svg';
import xBtn from '../../assets/icons/x.svg'
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
                    <img src={xBtn} onClick={handleClose} id="nr-exit-btn" />
                </div>
                <div id="nrm-header">
                    <h1>Write a public review</h1>
                    <p>Tell the next guests what you loved, and anything else about this place.</p>
                </div>
                <form id="review-form">
                    <TextareaAutosize
                        id="rvw-txt-area"
                        minRows={5}
                        placeholder='How was your stay?'
                    />
                    <div id="review-stars">
                       <img src={star}></img>
                       <img src={emptyStar}></img>
                    </div>
                    <button id="nw-rvw-sbmt-btn" type="submit">Submit Review</button>
                </form>
            </div>
        </section>
    )
}

export default NewReviewModal;
