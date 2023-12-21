import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import NavBar from '../../components/Navigation/NavBar';
import Footer from '../../components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { getOneSpotThunk } from '../../store/spots';
import ReviewComponent from '../../components/Review/Review';


const SpotDetail: React.FC = (): JSX.Element | undefined => {
    const dispatch = useDispatch();
    const {id} = useParams()
    const spots = useAppSelector((state) => state.spots.byId)
    const [spot, setSpot] = useState<null | Spot>(null);
    const [show404, set404] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(()=> {
        if(spots){
            if(spots[`${id}`]){
                setSpot(spots[`${id}`])
            } else{
                setSpot(null)
            }
        }
        if(!spot && id){
            dispatch(getOneSpotThunk(id))
            .then((response:any) => {
                if(response.ok){
                    set404(false);
                    if(spot === null  && spots){
                        setSpot(spots[`${id}`])
                    }
                }
            })
            .then(() => setIsLoaded(true));

        } else {
            set404(true);
        }
    }, [spot])

function generate404(){
    if(show404 && isLoaded){
        return <h1>404</h1>
    } else {
        return null;
    }
}

if(!spot || show404){
    setTimeout(generate404, 2000)
    // return <h1>Loading...</h1>
} else {
    return (
        <>
        <NavBar />
        <Divider/>
        <div className='spot-detail-container' style={{maxWidth: '1200px', marginBottom: '10px'}}>
            <SpotDetailHeader name={spot.name}/>
            <SpotDetailImages image={spot.previewImage? spot.previewImage: spot.SpotImages[0].url}/>
            <Summary name={spot.name} rating={spot.avgRating}/>
            <Divider style={{width: '30rem', }}/>
            <AdditionalDetail />
            <Divider style={{width: '30rem', }}/>
            <HostDetails name={door}/>
            <HostDetails name={calendar}/>
            <Divider style={{width: '30rem', }}/>
            <Paragraph />
            <Divider style={{width: '30rem', }}/>
            <MyCalendar />
            <Divider style={{width: '30rem', }}/>
        </div>
        <Divider />
        <ReviewComponent reviews={spot.reviews}/>
        <Divider />
        <Footer />
        </>
        );
    }
};

export default SpotDetail;
