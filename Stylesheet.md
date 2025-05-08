# Stylesheet

## Github :) 

This team uses Github for version control and collaboration. On the Github page for this project (https://github.com/AnthonyBronca/Firebnb), you can find relevant documentation for tasks, updates, and issues.

### Wiki

The FireBnb Wiki is the main source for documentation on this project. It includes information on the API, Schemas, User Stories, and additional information on the code. The Wiki will be updated frequently as relevant changes are made that require documentation. Authors of this project can create additional subsections to help manage documentation.

The Wiki can be found here (https://github.com/AnthonyBronca/FireBnB/wiki)

### Kanban

The Kanban can be found here: (https://github.com/users/AnthonyBronca/projects/10)

We utilize the Kanban on Github. This is where we can manage plans amongst the group. It includes the following columns:

- Bench: This is the section for features that we are putting aside for the mean time while other features are prioritized. Some tasks here may be part of the MVP, but are simply benched due to further discussions on implementations needed.

- Todo: These are items for tasks that should be completed in the short term to meet the goals of things expected in the long term

- In Progress: These are items that have been checked out. Items that are checked out should be assigned to whomever is responsible for the progress of that item. Additional comments based on code, bugs, and updates can be found within the issue.

- Requesting Assistance: This is for things that have been worked on, but may require further eyes-on. This may include a bug, a feature that needs to be fleshed out, or something that is good for beginners to work on but should still be done in the short term. Additional information on each task can be found inside the ticket item's issue

- In QA Testing: This is a feature that is deemed complete, but needs to be tested before pushing to production. These items should have proper documentation of any bugs/suggested fixes inside. Steps to reproduce bugs should be included. Relevant group members should be notified of any possible changes.

- Done: These are items that have been completed, vetted, and are now part of the production build with no known bugs during push.

New items created in the Kanban should be created in the relevant column, and added as an Issue.

### Issues

Our team utilizes the `Issues` section on Github.
Here we can create ticket items for things to work on. These issues are tied in conjuction with the Kanban planning board. Any items created in the Kanban can be converted into an issue. Proper labelling, assignment, and documentation should take place within each issue item.

When an item is completed, it should be marked as closed.

### How to Clone and Other Git Commands

Github allows us to clone projects and even specific branches. We can run the following command to receive the `main` branch:

```sh
git clone https://github.com/AnthonyBronca/FireBnB.git
```

To see all branches available you can run:

```sh
git branch
```

To switch between available branches you can run:

```
git checkout <branch name>
```

To create a new branch you can run:

```
git checkout -b <initials/feature or issue>
```

To stash a working batch:

```
git stash
```


### Pushing to the Project

Team members should work to push their code often.

A push should then be followed by a pull request (PR)

A PR can be submitted in the `Pull Requests` section of the Github Repo. The most recent pushes should show up towards the top of the repo, but you can also create one manually by pressing `New Pull Request` in the `Pull Requests` panel.

A PR from a personal branch should be requested to be added to `staging` and **NOT** `main`.

Once a PR is opened, relevant comments should be made to the PR with updates on the code requesting to be added. Additionally, a PR should be reviewed before merging to `staging`.

After a PR is accepted to be merged into `staging`, it will eventually be added to `main` when the next PR is made for production level deployment.



## Code

### React-Router V6
We are utiizling React-Router v6. This is a relatively new change to the React-Router syntax, and thus may be confusing at first. These changes can be found in the `frontend/src/App.tsx` file.

To add a new route, you must add a new path object to the `mainRoutes` array. Example:

```ts
  const mainRoutes = [
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '*',
    element: <h1>404: Error Page</h1>
  },
]
```

The path key let's us declare what url in the browser will trigger a specific rendered item

The element key lets us determine what react we want to be rendered at that path. In the example above, we can pass in custom `Screens` from the `frontend/src/screens` directory. These are basically just compartmentalized react components that are built using react sub-components. You can also see regular react would work just as well by passing in `HTML`tags, but this should be avoided.


### Redux with Toolkit and Typescript

Redux works a little bit different with Typescript and Toolkit support. While the code in the project is not the most "up to date" version of redux, it works as a happy blend between older redux syntax that would work with JS, and new syntax that is also more compatitble with Typescript.


A new slice of state can be created by doing the following:

1. Having the correct imports

```ts
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

```
2. creating an `Action Creator`

```ts
const setSpots = (spots: Spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};
```
Notice we are using a custom type for spots as Spots. This should also be imported at the top from the typings folder. Our code should now look like this:

```ts
import { SpotInitialState, Spot, Spots } from "../typings/redux";
import { csrfFetch } from "./csrf";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const SET_SPOTS = 'spots/setSpots';

const setSpots = (spots: Spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    };
};
```

3. Create a Thunk

While Thunks are slowly being phased out, we decided to keep this as it makes for easier reading and showcasing to those used to legacy code. This does need to be used using some `any` types, unfortunately, but the benefit of readability for new Typescript users makes it worth utilizing.

```ts
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
```

Here we declare a thunk name. This particular example is not taking any arguments from the frontend request. We should put the return type as `any` for ease of use, although we may work on removing this in future renditions. We must return an asyncronous call back that takes in a dispatch, which is assigned to the `Dispatch` type from the imports. The return of this call back is a `Promise<any>`. The Promise accepts an `any` generic as it is difficult to know what type data will return

Within the thunk we should use a `try...catch` block for error handling.

4. Create a slice of state:

In JS you could just do:

```js
let state = {}
```
But this does not work in Typescript as our slice can change from null, to some known object. Our slice should look like:

```ts
const initialState:SpotInitialState = {
    spots: null
}
```

This lets us declare a key that is instantiated to null, but the custom type of `SpotInitialState`, in this example, lets us tell Typescript that this may change to some known value in the future.

5. Create a Reducer

Reducers in Typescrit look a bit different as well. We are utilizing the ToolKit for this, which lets us not have use switch cases.

```ts
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
```

Here we export the slice, and create a slice of state using the `createSlice` function from the toolkit. We give the slice a name, pass in the initial state, and give it of key of reducers. The reducers can then be sit based on `action creators` declared in step 2. These take in the state, an action, and then reassign the initial state with the payload from the `action creator`. Note that the type of action uses `PayloadAction`, which comes from the toolkit, and we can use generics to declare the structure of that payload. In this case, the payload is an Object with a key of "Spots", and the value would be an array of spot objects.

Note: we also need to export default the reducer object to be used in the initialReducer found in `/frontend/src/store/index.ts`

### Custom Typings

Custom Typings can be added to the `/frontend/src/typings/` directory. New files can be created using `filename.d.ts` structure.

For creating a custom Redux type, we can go into the `redux.d.ts` file.

Each type should follow similar syntax:

```ts
export interface TypeName {

}
```

Here we can declare the structure of our data from the backend and how we want our redux slice to look. Take Spot, for example, it can look like this:


```ts
export interface Spot {
    id: number,
    ownerId: number,
    address: string,
    city: string,
    state: string,
    country: string,
    description: string,
    avgRating: number,
    price: number,
    lat: number,
    lng: number,
    previewImage: string,
    createdAt: string
    updatedAt: string
}
```
If I want to use that type within another type, I can do:

```ts
export interface Spots{
    spots: Spot[]
}
```
This is saying we have a Spots object where a key of "spots" is present, and the value of that key is an array of Spot objects that follow the structure of the Spot Interface above. Cool!


## Vite

Create-React-App is oldschool! We use Vite!

Vite works very similarly, except it does not use webpack bundlers. In the `/frontend/vite.config.ts` file, we can change the proxy as needed.


```js
 proxy: {
      '/api': {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: true,
      }
    }
```

Vite does need to be built using `npm run build` and then `npm start` to see production level build. You can also run `npm run dev` to see it in development. Note that dev will open in a development port, likely port:3000. Production will run in a vite defaulted port at port:4173


## Redux

Redux has some great docs for this.
### State Normalization
[Normalize State Shape](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape)


Redux states that we should normalize our state as an object. We should take into consideration efficiency and utility when working with state.

We want to normalize the data into using objects for ids (O(1) look up time) and then we can use something like `Object.values` wrapped around our components `useAppSelector()` to convert the values into arrays. If we keep it as an array in our slice of state, it may make it easier to map over the component but this can introduce an O(n)^2 look up time when trying to find an element. For example Spots's state data can now look like this:

```ts
{
    spots: {
        1: Spot{....},
        2: Spot{....},
        3: Spot{....},
        4: Spot{....},
        5: Spot{....},
    }
}

```
We can also keep track of any relevant information we may need to access within our slice of state. Example if I needed to keep track of states:

```ts
{
    spots: {
        byId: {
            1: Spot{....},
            2: Spot{....},
            3: Spot{....},
            4: Spot{....},
            5: Spot{....},
        },
        allStates: States[]
    }
}
```
According to the Redux docs, we should aim to also process all the data manipulation within the reducer itself. We could use a helper function insde the Redux file, but we should definitely avoid having this be rendered via the client. This can drastically help with optimization speeds, especially across different machine constraints.


### Redux Toolkit

[Redux ToolKit Docs](https://redux.js.org/redux-toolkit/overview)

Redux Toolkit is the latest tooling that Redux has to offer. It comes included with many built in functions to help ease the use of redux, while also providing optimal builds out-of-the-box.

Tools we currently use in the project:

- `createSlice()`: Accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.

- `createReduce()`: Lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the immer library to let you write simpler immutable updates with normal mutative code, like

- `configureStore()`: Wraps createStore to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes redux-thunk by default, and enables use of the Redux DevTools Extension.

We may look into refactoring our `thunks` into using the following Toolkit tool.

- `createAsyncThunk()`: Accepts an action type string and a function that returns a promise, and generates a thunk that dispatches pending/fulfilled/rejected action types based on that promise

Additional information for `createAysncThunk()` can be found here for if/when we decide to implement it: [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)


### React Calendar

Using the npm package [React-Calendar](https://www.npmjs.com/package/react-calendar)
We are able to easily create a user-friendly calendar

#### Props

| Prop Name      | Description                  | Default Value | Example         |
| -------------- | ---------------------------- | ------------- | --------------- |
| `activeStartDAte`        | The beginning of a period that shall be displayed. If you wish to use react-calendar in an uncontrolled way, use defaultActiveStartDate instead.    | `today` | `new Date(2023, 11, 1)` |
| `className`        | assign a react-class       | n/a | n/a |
| `defaultActiveStartDate`  | defaultActiveStartDate	The beginning of a period that shall be displayed by default. If you wish to use react-calendar in a controlled way, use activeStartDate instead.   | `(today)` | `new Date()` |
| `onChange`  | Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available.   | n/a | (value, event) => alert('New date is: ', value) |
| `onClickDay`  | Function called when the user clicks a day.   | n/a | (value, event) => alert('Clicked day: ', value) |
| `onClickDecade`  | Function called when the user clicks a decade.   | n/a | (value, event) => alert('Clicked decade: ', value) |
| `onClickMonth`  | Function called when the user clicks a month.   | n/a | (value, event) => alert('Clicked month: ', value) |
| `onClickYear`  | onClickYear	Function called when the user clicks a year.   | n/a | (value, event) => alert('Clicked year: ', value) |
| `showNeighboringMonth`  | Whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively.   | `true` | n/a |
| `hover`  | The date over which the user is hovering. Used only when selectRange is enabled, to render a “WIP” range when the user is selecting range.   | n/a | new Date(2017, 0, 1) |
| `onClick`  | Function called when the user clicks an item (day on month view, month on year view and so on).   | n/a | (value) => alert('New date is: ', value) |
