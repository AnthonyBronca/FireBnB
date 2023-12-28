import React, { useContext, useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import xlogo from '../../assets/icons/x.svg'
import { useDispatch } from 'react-redux';
import './css/EditForm.css'
import EditFormModalContext from '../../context/EditFormContext';
import { deleteSpotThunk, editSpotThunk } from '../../store/spots';
import DeleteFormModalContext from '../../context/DeleteFormContext';

interface IEditFormProps {
  title: string;
  userId: number;
  spotId: number;
}

const DeleteForm:React.FC<IEditFormProps> = ({title, userId, spotId}):JSX.Element => {
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>(title);
  const {toggleDeleteOpen} = useContext(DeleteFormModalContext);

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


    setErrors(err);
    if(errors.length === 0){
      let form = {spotId, name,}
      let res = await dispatch(editSpotThunk(userId, form))
      if(!res.ok){
        setErrors([res.message]);
      } else{
        closeModal()
      }
    }
  }

  const closeModal = () => {
    toggleDeleteOpen(false)
  }

  const handleDelete = (spotId:number) => {
    dispatch(deleteSpotThunk(userId, spotId))
    closeModal();
  }


  return (
    <div className='form-modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className="modal-header-contents">
            <button className='close-button' onClick={closeModal}>
              <img src={xlogo} alt="close icon" className='close-button-image'/>
            </button>
            <span className='form-header-span'>Delete Listing</span>
          </div>
          <Divider />
        </div>
        <h3>{title}</h3>
        <p className='warning-p'>You are about to delete this listing. All relevent data such as images, reviews, and bookings will be deleted. This action can not be undone. Are you sure you want to delete this spot?</p>
        <div className='input-boxes-sign-in'>
            <button className='cancel-button' onClick={closeModal}>Cancel</button>
            <button className='submit-edit-button' onClick={()=> handleDelete(spotId)}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteForm;
