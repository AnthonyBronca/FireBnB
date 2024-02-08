
/*
This is a util function that we can use in redux.

It will take our string url and output the appropriate ending

*/

// adjust this once we deploy backend api
const deployedBackendURL = "";
const devURL = "https://test.loca.lt";
let environment = process.env.NODE_ENV === "production";


export default function urlParser(url:string): string{
    // True if production, false if development
    if(environment){
        let prodUrl = `${deployedBackendURL}/${url}`;
        return prodUrl;
    } else{
        let devUrl = `${devURL}/${url}`;
        return devUrl;
    }
};
