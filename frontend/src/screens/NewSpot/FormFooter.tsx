import React from 'react';
import './css/list-footer.css';
import { useFormContext } from '../../context/NewSpotContext';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
// import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';


interface ButtonFuncProps{
    nextStep: React.Dispatch<React.SetStateAction<number>>;
    newVal: number;
    text: string;
    classVal: string;
    count: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
    setCheck: React.Dispatch<React.SetStateAction<boolean>>;
    check: boolean;

}


const FormFooter: React.FC<ButtonFuncProps> = ({nextStep, newVal, text, classVal, count, setCheck, check}): JSX.Element | null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {formData} = useFormContext();
  // const user = useAppSelector((state) => state.session.user)


  const handleNext = async () => {
    if(newVal >= 75){
      // if(user){ //delete this after auth is added to page
        if(!formData.lat){
          formData.lat = 40.7128
        }
        if(!formData.lng){
          formData.lng = -74.006;
        }

        const response = await dispatch(createSpot(1, formData));
        if(response.ok){
          setCheck(true);
          setTimeout(()=> {
            navigate('/');
          }, 3000);
        }

    } else{
      nextStep(newVal + count)
    }
  }
  if(check){
    return null
  } else{
      return (
        <>
      <footer className={`list-form-footer-${classVal}`}>
          <div className={`form-container-${classVal}`}>
              {newVal >= 25? <span className='next-back' onClick={()=> nextStep(newVal - count)}>Back</span>: null}
              <button className={`button-${classVal}`} onClick={handleNext}>{text}</button>
          </div>
      </footer>
      </>
    );
  }
}

export default FormFooter;
