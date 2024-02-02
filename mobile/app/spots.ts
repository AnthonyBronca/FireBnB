import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Spot, SpotId, SpotOwner } from "../typings/redux";
// import type { RootState } from "./store";


// Define types for the slice state
interface spotState {
    byId: SpotId | null;
    allSpots: Spot[] | null;
    userSpots: Spot[] | null;
    userSpotId: SpotId | null;
};

// Define the initial state using that type
const initialState: spotState = {
    byId: {},
    allSpots: [],
    userSpots: [],
    userSpotId: {}
};

// SpotSlice reducer
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
            };
        },
        addSpot: (state, action: PayloadAction<Spot>) => {
            if(state.byId !== null){
                state.byId[`${action.payload.id}`] = action.payload
            };
            if(state.allSpots instanceof Array){
                state.allSpots.push(action.payload);
            };
        },
        // setSpot,
        // getUserSpots,
        // editSpot,
        // deleteSpot

    },
});

export const { } = SpotSlice.actions;

export default SpotSlice.reducer;
