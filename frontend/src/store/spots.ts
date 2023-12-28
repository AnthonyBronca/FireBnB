import {SpotInitialState, Spot, Spots, INewSpotForm, IEditForm} from "../typings/redux";
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const SET_SPOTS = 'spots/setSpots';
const ADD_SPOT = 'spots/addSpot';
const SET_SPOT = 'spots/setSpot';
const GET_USER_SPOTS = 'spots/getUserSpots';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_USER_SPOT = 'spots/deleteSpot';



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

const getUserSpots = (spots: Spots) => {
    return {
        type: GET_USER_SPOTS,
        payload: spots
    }
}

const editSpot = (spot: Spot) => {
    return {
        type: EDIT_SPOT,
        payload: spot
    }
};

const deleteSpot = (spot: Spot) => {
    return {
        type: DELETE_USER_SPOT,
        payload: spot
    }
}

//delete a spot

export const deleteSpotThunk = (userId: number, spotId: number):any => async (dispatch: Dispatch): Promise<any> => {
    try{

        const options = {
            method: 'DELETE',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId})
        }

        const response = await csrfFetch(`/api/spots/${spotId}`, options);
        if(response.ok){
            const data = await response.json();
            dispatch(deleteSpot(data));
            return response;
        } else {
            throw response;
        }
    } catch(e){
        return e;
    }
}



//edit a spot
export const editSpotThunk = (userId: number, form: IEditForm):any => async (dispatch: Dispatch): Promise<any> => {
    try {
        let {spotId} = form;
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                newPrice: form.price,
                newName: form.name,
                userId
            })
        }
        const response = await csrfFetch(`/api/spots/${spotId}`, options)
        if(response.ok){
            const data = await response.json();
            dispatch(editSpot(data));
            return response;
        } else{
            throw response
        }
    } catch (res:any) {
            let errors = await res.json();
            return errors;
    }
}

//get all spots for user
export const getAllUserSpots = (userId: number):any => async (dispatch: Dispatch): Promise<any> => {
    try {
        const response = await csrfFetch(`/api/spots/current/${userId}`)
        if(response.ok){
            const data = await response.json();
            dispatch(getUserSpots(data));
            return response
        } else{
            throw response;
        }
    } catch (res:any) {
        let error = res.json();
        return error;
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
    allSpots: [],
    userSpots: [],
    userSpotId: {}
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
            if(state.byId){
                state.byId[`${action.payload.id}`] = action.payload;
            }
        },
        getUserSpots: (state, action: PayloadAction<{Spots: Spot[]}>) => {
            state.userSpotId = {};
            state.userSpots = action.payload.Spots;
            console.log(action.payload)
            for(let spot of action.payload.Spots){
                if(!state.userSpotId[`${spot.id}`]){
                    state.userSpotId[`${spot.id}`] = spot;
                }
            }
        },
        editSpot: (state, action: PayloadAction<Spot>) => {
            if(state.userSpotId && state.userSpotId[`${action.payload.id}`]){
                state.userSpotId[`${action.payload.id}`].name = action.payload.name;
                state.userSpotId[`${action.payload.id}`].price = action.payload.price;
            }

            if(state.byId && state.byId[`${action.payload.id}`]){
                state.byId[`${action.payload.id}`].name = action.payload.name;
                state.byId[`${action.payload.id}`].price = action.payload.price;
            }

            if(state.userSpots && state.userSpots.length > 0){
               for(let i = 0; i < state.userSpots.length; i++){
                let spot = state.userSpots[i];
                if(spot.id === action.payload.id){
                    state.userSpots[i].name = action.payload.name;
                    state.userSpots[i].price = action.payload.price;
                    break;
                }
               }
            }
            if(state.allSpots && state.allSpots.length > 0){
               for(let i = 0; i < state.allSpots.length; i++){
                let spot = state.allSpots[i];
                if(spot.id === action.payload.id){
                    state.allSpots[i].name = action.payload.name;
                    state.allSpots[i].price = action.payload.price;
                    break;
                }
               }
            }
        },
        deleteSpot: (state, action: PayloadAction<Spot>) => {
            console.log(action.payload, "here");
            if(state.allSpots && state.allSpots.length > 0){
                let newState = state.allSpots.filter(spot => {
                    return spot.id !== action.payload.id;
                })
                state.allSpots = newState;
            }

            if(state.byId && state.byId[`${action.payload.id}`]){
                delete state.byId[`${action.payload.id}`]
            }

            if(state.userSpots && state.userSpots.length > 0){
                let newState = state.userSpots.filter(spot => {
                    return spot.id !== action.payload.id;
                })
                state.userSpots = newState;
            }

            if(state.userSpotId && state.userSpotId[`${action.payload.id}`]){
                delete state.userSpotId[`${action.payload.id}`];
            }
        }
    }
})

export default SpotSlice.reducer
