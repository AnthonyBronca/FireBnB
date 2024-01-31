import React, { useContext } from 'react';
//import { useAppSelector } from '../../store';

import NewReviewModalContext from '../../context/NewReviewModalContext';

interface INewReviewProps {
    spotId: number
}

const NewReviewModal: React.FC<INewReviewProps> = ({ spotId }):JSX.Element => {
    //const user = useAppSelector((state) => state.session.user);
    const { open, togglePostReviewOpen } = useContext(NewReviewModalContext);

    const handleClose = () => {
        if (open) {
            togglePostReviewOpen(false)
        }
    }
    const handleOpen = () => {
        console.log(open, "click")
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
