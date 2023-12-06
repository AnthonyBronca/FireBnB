import {SpotInitialState, Spot, Spots, INewSpotForm, User } from "../typings/redux";
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_SPOTS = 'spots/setSpots';
const ADD_SPOT = 'spots/addSpot';

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
            imgUrl
        } = form;

        const formData = new FormData();
        if(listingName && streetAddress && city && state && state && country && zipCode && description && imgUrl){
            formData.append("listingName",listingName);
            formData.append("streetAddress", streetAddress);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("country", country);
            formData.append("zipcode", zipCode);
            formData.append("description", description);
            formData.append("imgUrl", imgUrl);
        }


        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: formData
        }

        console.log(options.body)
        const response = await csrfFetch('/api/spots', options);
        if(response.ok){
            const spot = await response.json();
            dispatch(addSpot(spot))
            return "Spot posted successfully"
        } else{
            throw new Error("Unable to create spot")
        }
    } catch (e) {
        return e;
    }
}

//Spots initial State
const initialState:SpotInitialState = {
    byId: null,
    allSpots: null
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
                state.byId[`${spot.id}`] = spot;
            }
        },
        addSpot: (state, action: PayloadAction<{Spot: Spot}>) => {
            console.log(action.payload)
        }
    }
})

export default SpotSlice.reducer
