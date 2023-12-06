

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
};

interface NewSpotFormContextProps {
  formData: NewSpotFormContext;
  setFormData: React.Dispatch<React.SetStateAction<NewSpotFormContext>>;
}
