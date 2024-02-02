import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Spot } from '../../typings/redux';
import SpotDetailHeader from '../../components/SpotDetail/Header/SpotDetailHeader';
import SpotDetailImages from '../../components/SpotDetail/ImageSection/SpotDetailImages';
import Summary from '../../components/SpotDetail/Summary/Summary';
import { Divider } from '@mui/material';
import AdditionalDetail from '../../components/SpotDetail/Summary/AdditionalDetail';
import HostDetails from '../../components/SpotDetail/Summary/HostDetails';
import door from '../../assets/icons/door.svg'
import calendar from '../../assets/icons/calendar.svg'
import Paragraph from '../../components/SpotDetail/Summary/Paragraph';
import MyCalendar from '../../components/SpotDetail/Summary/Calendar';
import NavBar from '../../components/Nav/NavBar';
import Footer from '../../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';
import ReviewComponent from '../../components/Review/Review';
import './SpotDetail.css'
import BookingForm from '../../components/BookingForm';

const SpotDetail: React.FC = (): JSX.Element | undefined => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {id} = useParams()
    const spots = useAppSelector((state) => state.spots.byId)
    const [spot, setSpot] = useState<null | Spot>(null);
    const [show404] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    document.title = `${spot?.name}`;
    useEffect(()=> {
        console.log('here 1')
        if(spots){
            console.log('here 2')
            if(spots[`${id}`]){
                console.log('here 3')
                setSpot(spots[`${id}`])
            } else{
                console.log('here 4')
                setSpot(null)
            }
        }
        if(!spot && id){
            console.log('here 5')
            const getSpots = async () => {
                try{
                    const data = await dispatch(getOneSpotThunk(id))
                    setSpot(data)
                    setIsLoaded(true)
                    console.log('here 6')
                } catch (e:any){
                    console.log('here 7')
                    if(e.message){
                    }
                }
            }

            getSpots()
        }
    }, [spots])

// function generate404(){
//     if(show404 && isLoaded){
//         return <h1>404</h1>
//     } else {
//         return null;
//     }
// }

if(!spot || show404){
    // setTimeout(generate404, 2000)
    return <h1>Loading...</h1>
} else if(isLoaded) {
    return(
        <>
        <NavBar />
        <Divider/>
        <div className='spot-detail-container'>
            <SpotDetailHeader name={spot.name}/>
            <SpotDetailImages image={spot.previewImage? spot.previewImage: spot.SpotImages[0].url}/>
            <div className='spot-info-booking-container'>
                <div className='left-side-container-items'>
                <Summary reviewCount={spot.reviews?.length} name={spot.name} rating={spot.avgRating}/>
                <Divider style={{width: '30rem', }}/>
                <AdditionalDetail spot={spot} />
                <Divider style={{width: '30rem', }}/>
                <HostDetails
                    info={{text1: "Self Check-in Available", text2: "Self Checkout-out Available"}}
                    spot={spot}
                    name={door}
                    type="door"
                    />
                <HostDetails
                    info={{text1: "Easy Booking Enabled", text2: "High-Demand"}}
                    spot={spot}
                    name={calendar}
                    type="booking"
                    />
                <Divider style={{width: '30rem', }}/>
                <Paragraph spot={spot}/>
                <Divider style={{width: '30rem', }}/>
                <MyCalendar />
                </div>
                <div className='right-side-container-items'>
                    <BookingForm spotId={spot.id}/>
                </div>
            </div>
            <Divider style={{width: '52rem', }}/>
        </div>
        <div className='review-main'>
            <div className='review-screen-container'>
                <ReviewComponent reviews={spot.reviews} spot={spot}/>
            </div>
        </div>
        <Divider />
        <Footer />
        </>
        );
    }
};

export default SpotDetail;
