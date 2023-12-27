import React, { useContext, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import xlogo from '../../assets/icons/x.svg'
import {TextField} from '@mui/material';
import { useDispatch } from 'react-redux';
import './css/EditForm.css'
import EditFormModalContext from '../../context/EditFormContext';
import { editSpotThunk } from '../../store/spots';
import { IEditForm } from '../../typings/redux';

interface IEditFormProps {
  title: string;
  price: string | number;
  userId: number;
  spotId: number;
}

const EditForm:React.FC<IEditFormProps> = ({title, price, userId, spotId}):JSX.Element => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>(title);
  const [listingPrice, setPrice] = useState<string | number>(price)
  const {toggleFormOpen} = useContext(EditFormModalContext);

  useEffect(()=> {
    const formModal = document.getElementsByClassName('form-modal');
    if(formModal[0]){
      formModal[0].addEventListener('click', (e)=> {
        if(e.target && e.target === e.currentTarget){
          closeModal()
        }
      })
    }
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors([]);
    let err: string[] = [];
    if(name.length <= 0){
      err.push('Name can not be empty')
    }
    if(name.startsWith(" ")){
      err.push("Name can not start with spaces");
    }
    if(typeof listingPrice === "string"){
      try{
        setPrice(Number(listingPrice));
      }catch(e: any){
        err.push(e)
      }
    }
    if(typeof listingPrice === 'number' && listingPrice < 1){
      err.push("Price must be at least $1.00 a night")
    }

    setErrors(err);
    if(errors.length === 0){
      let form: IEditForm = {spotId, name, price: listingPrice}
      let res = await dispatch(editSpotThunk(userId, form))
      if(!res.ok){
        setErrors([res.message]);
      } else{
        closeModal()
      }
    }
  }

  const closeModal = () => {
    toggleFormOpen(false)
  }


  return (
    <div className='form-modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className="modal-header-contents">
            <button className='close-button' onClick={closeModal}>
              <img src={xlogo} alt="close icon" className='close-button-image'/>
            </button>
            <span className='form-header-span'>Edit Listing</span>
          </div>
          <Divider />
        </div>
        <h3>{title}</h3>
        <div className='input-boxes-sign-in'>
          <form onSubmit={(e:any) => handleSubmit(e)} style={{display: 'flex', flexDirection: 'column'}}>
            <TextField
                    id="filled-basic"
                    label="Name"
                    variant='filled'
                    size='small'
                    type='text'
                    InputLabelProps={{
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }
                    }}
                    inputProps={{style: {
                        height: '.7rem',
                        backgroundColor: 'white',
                        border: '1px solid rgba(15, 15, 15, .2)',
                        borderRadius: '5px',
                        fontSize: '12px'
                    }}}
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
            <TextField
                    id="filled-basic"
                    label="Price per night"
                    variant='filled'
                    size='small'
                    type='number'
                    InputLabelProps={{
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Arial, Helvetica, sans-serif'
                        }
                    }}
                    inputProps={{style: {
                        height: '.7rem',
                        backgroundColor: 'white',
                        border: '1px solid rgba(15, 15, 15, .2)',
                        borderRadius: '5px',
                        fontSize: '12px'
                    }}}
                    value={listingPrice}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
                    />
                    <button className='submit-edit-button'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
