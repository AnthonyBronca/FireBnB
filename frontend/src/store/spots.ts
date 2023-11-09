import { SpotInitialState, Spot, Spots } from "../typings/redux";
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_SPOTS = 'spots/setSpots';

//initial state for Spots

const setSpots = (spots: Spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};

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

//Spots initial State
const initialState:SpotInitialState = {
    spots: null
}

//state reducer for Spots
export const SpotSlice = createSlice({
    name: 'spots',
    initialState,
    reducers: {
        setSpots: (state, action: PayloadAction<{Spots: Spot[]}>) => {
            state.spots = action.payload.Spots
        }
    }
})

export default SpotSlice.reducer
