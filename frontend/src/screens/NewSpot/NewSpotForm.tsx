import React, { useState } from 'react';
import './css/newSpotForm.css'
import states from '../../helpers/states';
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../store';
import { useFormContext } from '../../context/NewSpotContext';



const NewSpotForm: React.FC = (): JSX.Element => {

  // const dispatch = useDispatch();
  const {setFormData} = useFormContext();

  // const user = useAppSelector((state) => state.session.user!)
  // const [errors, setErrors] = useState<string[]>([]);


  const [showUpload, setShowUpload] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<any>("");

  const updateImage = async (e:any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      setShowUpload(false);
      return file
  };


const handleInputchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if(name === "imgUrl"){
      let file = await updateImage(e);
        setFormData((prevData)=> ({
          ...prevData,
          [name]: file,
        }));
      } else{
      setFormData((prevData)=> ({
        ...prevData,
        [name]: value,
      }));
    }
  }

    return (
      <form>
        <div className='new-spot-form-container'>
          <h4>Additional Information</h4>
          <div className='form-input-container'>
            <input
              className='new-spot-input'
              inputMode='text'
              placeholder='Listing Name'
              name='listingName'
              onChange={handleInputchange}
              />
            <input
              className='new-spot-input'
              inputMode='text'
              placeholder='Street Address'
              name='streetAddress'
              onChange={handleInputchange}
              />
           <input
             className='new-spot-input'
             inputMode='text'
             placeholder='City'
             name='city'
             onChange={handleInputchange}
             />
           <input
             className='new-spot-input'
             list="options"
             placeholder='State'
             name="state"
             onChange={handleInputchange}
             />
             <datalist id='options'>
              {states.map((option, index) => (
                <option key={index} value={option} onClick={()=> console.log('test input')} />
                ))}
             </datalist>
           <input
             className='new-spot-input'
             inputMode='text'
             placeholder='Country'
             name='country'
             onChange={handleInputchange}
             />
           <input
             className='new-spot-input'
             inputMode='numeric'
             placeholder='Zipcode'
             name='zipCode'
             onChange={handleInputchange}
             />
           <input
             className='new-spot-input'
             inputMode='text'
             placeholder='Description'
             name='description'
             onChange={handleInputchange}
             />
           <input
             className='new-spot-input'
             inputMode='text'
             placeholder='Price/night'
             name='price'
             onChange={handleInputchange}
             />
            <label htmlFor='file-upload' className='custom-file-upload'>
              Select from Device
              <input
                className='input-file-button'
                id='file-upload'
                type='file'
                name='imgUrl'
                accept=".jpg, .jpeg, .png, .gif"
                onChange={(e)=> handleInputchange(e)}
                />
            </label>
            {!showUpload && (
              <img
                src={previewUrl}
                className='previewImage'
                alt="preview"
              />
            )}
          </div>
        </div>
      </form>
    );
  // }
}

export default NewSpotForm;
