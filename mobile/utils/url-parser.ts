
/*
This is a util function that we can use in redux.

It will take our string url and output the appropriate ending

*/

import url from "../store/url";

// adjust this once we deploy backend api
const deployedBackendURL = "https://firebnb-api.onrender.com/";
const devURL = url;
let environment = process.env.NODE_ENV === "production";


export default function urlParser(apiurl:string): string{
    // True if production, false if development
    if(environment){
        let prodUrl = `${deployedBackendURL}/${apiurl}`;
        return prodUrl;
    } else{
        let devUrl = `${devURL}/${apiurl}`;
        return devUrl;
    }
};
