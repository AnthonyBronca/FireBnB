## Axios
[Axios Docs](https://axios-http.com/docs/intro)

Axios is a widely used promise-based HTTP Client that can be ran in Node.js and in the browser.

In this project, we combine Axios and Redux ToolKit to create a seamless, unified experience for data and state management.


## Redux Toolkit

[Redux ToolKit Docs](https://redux.js.org/redux-toolkit/overview)

Redux Toolkit is the latest tooling that Redux has to offer. It comes included with many built in functions to help ease the use of redux, while also providing optimal builds out-of-the-box.

Tools we currently use in the project:

- `createSlice()`: Accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.

- `createReduce()`: Lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the immer library to let you write simpler immutable updates with normal mutative code, like

- `configureStore()`: Wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.

- `createAsyncThunk()`: Accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise


A new slice of state can be created by doing the following:

### 1. Having the correct imports

```ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

```
Note here that we also import `axios` as it will be integrated in Step 2.

### 2. Setting up `createAsyncThunk` functions

```ts
export const fetchLikes = createAsyncThunk("likes/fetchLikes", async (userId:number) => {
    try {
        const response = await axios.get(`/api/spots/likes/${userId}`);
        return response.data;
    } catch (error) {
        throw error
    }
  });
```
In this example, there are no arguments being passed in from the frontend request.

`createAsyncThunk` handles asynchronous operations by generating an action creator wherein a string action type is defined as the first argument, and the second argument is the asyncronous callback function that returns a promise. 

Inside of this callback function, we send a request to the server using `axios` by simply appending an HTTP method to it and stating the URL that the request is to be sent to as the first argument. We then return the response object. Within the thunk, a `try...catch` block is used for error handling.

### 3. Create a slice of state:

In JS you could just do:

```js
let state = {}
```
But this does not work in Typescript as our slice can change from null, to some known object. Our slice should look like:

```ts
const initialState:LikeInitialState = {
    byId: {},
    allLikes: []
};
```

This lets us declare keys that are instantiated to an empty object and empty array, respectively. However, in this example, the custom type of `LikeInitialState` lets us tell Typescript that this may change to some known value in the future.

Note: The structure of the _LikeInitialState_ interface can be seen in the Typings folder. It should also be imported at the top of the file like so:
```ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LikeInitialState } from "../typings/redux";
```

### 4. Create a Reducer

Reducers in Typescript look a bit different as well. We are utilizing the ToolKit for this, which lets us not have to use switch cases.

```ts
export const LikeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLikes.fulfilled, (state, action:PayloadAction<Likes>) => {
            state.byId = {};
            state.allLikes = action.payload.likes;
            for(let like of action.payload.likes){
                let spot = like.Spot
                if(!state.byId[`${spot.id}`]){
                    state.byId[`${spot.id}`] = spot;
                };
            };
        })
    } 
});
export default LikeSlice.reducer
```

Here we export the slice, and create a slice of state using the `createSlice` function from the toolkit. We give the slice a name, pass in the initial state, and give it a key of reducers. Because we are utilizing `createAsyncThunk`, we initialize the value of the reducers key to an empty object. To handle each action type (the first argument in the `createAsyncThunk` function), we use the [builder callback and its case reducer method](https://redux-toolkit.js.org/api/createReducer#builderaddcase). The first argument of the `builder.addCase` method should be the name of the asynchronous thunk function (declared in Step 2) with an appendes lifecycle action (_pending_, _fulfilled_, or _rejected_), while the second argument is the case reducer function. This second argument takes in the state, an action, and then reassigns the inital state with the payload from the action creator generated by `createAsyncThunk`.

Note that the type of action uses `PayloadAction`, which comes from the toolkit, and we can use generics to declare the structure of that payload. In this case, the payload would be data taking the form of the _Likes_ interface (_Likes_ should also be imported at the top of the file). Under the hood, `createSlice` uses [immer](https://immerjs.github.io/immer/) to help simplify the way we create Redux logic to handle each action type case, as can be observed in the example.

Each action type case should be handled by appending the `.addCase` method after each completed case. This involves creating the logic to handle the _fulfilled_ lifecycle action, at minimum, for each action type.

Once the reducer object is configured, we also need to export default it to be used in the rootReducer found in `/mobile/app/store.ts`.
