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
import Calendar from '../../components/SpotDetail/Summary/Calendar';
import NavBar from '../../components/Navigation/NavBar';
import Footer from '../../components/Footer/Footer';


const SpotDetail: React.FC = (): JSX.Element => {
    const {id} = useParams()
    const spots = useAppSelector((state) => state.spots.byId)

    const [spot, setSpot] = useState<null | Spot>(null);

    useEffect(()=> {
        if(spots){
            setSpot(spots[`${id}`])
            console.log(spot)
        }
    }, [spot])


if(!spot){
    return <h1>404</h1>
} else {
    return (
        <>
        <NavBar />
        <Divider/>
        <div className='spot-detail-container' style={{maxWidth: '1200px', marginBottom: '10px'}}>
            <SpotDetailHeader name={spot.name}/>
            <SpotDetailImages image={spot.previewImage}/>
            <Summary name={spot.name} rating={spot.avgRating}/>
            <Divider style={{width: '30rem', }}/>
            <AdditionalDetail />
            <Divider style={{width: '30rem', }}/>
            <HostDetails name={door}/>
            <HostDetails name={calendar}/>
            <Divider style={{width: '30rem', }}/>
            <Paragraph />
            <Divider style={{width: '30rem', }}/>
            <Calendar />
            <Divider style={{width: '30rem', }}/>
        </div>
        <Divider />
        <Footer />
        </>
        );
    }
};

export default SpotDetail;
