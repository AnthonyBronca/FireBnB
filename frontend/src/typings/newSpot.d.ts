

export interface SpotId {
   [id:number|string]: Spot;
};


export interface NewSpotFormContext {
   listingName: string;
   streetAddress: string;
   city: string;
   state: string;
   country: string;
   zipCode: string;
   description: string;
   imgUrl: string;
   lat?: number | string,
   lng?: number | string,
   price: string,
};

interface NewSpotFormContextProps {
  formData: NewSpotFormContext;
  setFormData: React.Dispatch<React.SetStateAction<NewSpotFormContext>>;
}
