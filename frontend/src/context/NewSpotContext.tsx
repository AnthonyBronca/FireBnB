import { createContext, useContext, useState } from "react";
import { NewSpotFormContext, NewSpotFormContextProps } from "../typings/newSpot";



//create the shape of our context with default items
const defaultState:NewSpotFormContext = {
    listingName: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    zipCode: "",
    description: '',
    imgUrl: '',
    lat: '',
    lng: '',
    price: '',
};

//create our context start point, and function to change data
const FormContext = createContext<NewSpotFormContextProps>({
    formData: defaultState,
    setFormData: () => {},
});


export const useFormContext = () => useContext(FormContext);

export const FormProvider: React.FC<any> =({children}) => {
    const [formData, setFormData] = useState<NewSpotFormContext>(defaultState);
    return (
        <FormContext.Provider value={{formData, setFormData}}>
            {children}
        </FormContext.Provider>
    )
}


// export default NewSpotFormContext;
