import {SpotInitialState, Spot, Spots, INewSpotForm} from "../typings/redux";
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_SPOTS = 'spots/setSpots';
const ADD_SPOT = 'spots/addSpot';
const SET_SPOT = 'spots/setSpot';

const setSpots = (spots: Spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};

const addSpot = (spot: Spot) => {
    return {
        type: ADD_SPOT,
        payload: spot
    }
}

const setSpot = (spot: Spot) => {
    return{
        type: SET_SPOT,
        payload: spot
    }
}
//thunk to get all spots
export const getAllSpots = ():any => async (dispatch: Dispatch): Promise<any> => {
    try {
        const response = await csrfFetch('/api/spots')
        const data = await response.json();
        dispatch(setSpots(data))

    } catch (res:any) {
        if(!res.ok){
            let errors = await res.json();
            console.log(errors)
            return errors;
        }
    }
}

//thunk to post a spot
export const createSpot = (userId: number, form:INewSpotForm):any => async (dispatch: Dispatch): Promise<any> => {
    try{

        const {
            listingName,
            streetAddress,
            city,
            state,
            country,
            zipCode,
            description,
            imgUrl,
            lat,
            lng,
            price,
        } = form;

        const formData = new FormData();

        if(listingName) formData.append("name",listingName);
        if(streetAddress) formData.append("address", streetAddress);
        if(city) formData.append("city", city);
        if(state)formData.append("state", state);
        if(country) formData.append('country',country);
        if(zipCode) formData.append("zipcode", zipCode);
        if(description) formData.append("description", description);
        if(imgUrl) formData.append("image", imgUrl);
        if(lat) formData.append('lat', String(lat));
        if(lng) formData.append('lng', String(lng));
        if(price) formData.append('price', price);
        if(userId) formData.append('userId', String(userId));
        const options = {
            method: 'POST',
            headers: {"Content-Type": "multipart/form-data"},
            body: formData
        }

        const response = await csrfFetch('/api/spots', options);
        if(response.ok){
            const spot = await response.json();
            console.log("spot from backend", spot)
            dispatch(addSpot(spot))
            return response
        } else{
            throw new Error("Unable to create spot")
        }
    } catch (e) {
        return e;
    }
}

// thunk to get a single spot detail
export const getOneSpotThunk = (spotId: string):any => async (dispatch: Dispatch): Promise<any> => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`)
        if(response.ok){
            const data:Spot = await response.json();
            dispatch(setSpot(data))
            return response
        } else{
            throw response.json();
        }
    } catch (res:any) {
        return res
    }
}

//Spots initial State
const initialState:SpotInitialState = {
    byId: {},
    allSpots: []
}


//state reducer for Spots
export const SpotSlice = createSlice({
    name: 'spots',
    initialState,
    reducers: {
        setSpots: (state, action: PayloadAction<{Spots: Spot[]}>) => {
            state.byId = {};
            state.allSpots = action.payload.Spots;

            for(let spot of action.payload.Spots){
                if(!state.byId[`${spot.id}`]){
                    state.byId[`${spot.id}`] = spot;
                }
            }
        },
        addSpot: (state, action: PayloadAction<Spot>) => {
            if(state.byId !== null){
                state.byId[`${action.payload.id}`] = action.payload
            }
            if(state.allSpots instanceof Array){
                state.allSpots.push(action.payload);
            }
        },
        setSpot: (state, action: PayloadAction<Spot>) => {
            console.log(action.payload)
            if(state.byId){
                state.byId[`${action.payload.id}`] = action.payload;
            }
        }
    }
})

export default SpotSlice.reducer
