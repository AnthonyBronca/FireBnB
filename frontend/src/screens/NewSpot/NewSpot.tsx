import React, { useState } from 'react';
import InitialForm from './InitialForm';
import ListNavBar from '../../components/Nav/ListNavBar';
import FormFooter from './FormFooter';
import { LinearProgress } from '@mui/material';
import AboutForm from './AboutForm';
import LocationForm from './LocationForm';
import NewSpotForm from './NewSpotForm';
import { FormProvider } from '../../context/NewSpotContext';
import Checkmark from '../../components/Checkmark';


interface IComponentToRender {
  component: JSX.Element;
  text: string;
  classVal: string
}

const NewSpot: React.FC = (): JSX.Element => {


  document.title = "Create your listing - Firebnb";

  const [val, setVal] = useState<number>(0);
  const [count, setCount] = useState<number>(25)
  const [checkMark, setCheck] = useState<boolean>(false);

  const componentToRender:any = {
    0: {
      component: <InitialForm />,
      text: "Get Started",
      classVal: "get-started"
    },
    25:
       {
        component: <AboutForm />,
        text: "Next",
        classVal: "next"
      },
    50: {
      component: <LocationForm />,
      text: "Next",
      classVal: "next",
    },
    75: {
      component: <NewSpotForm />,
      text: "Submit",
      classVal: "next"
    },
    100: {
      component: <Checkmark />,
      classVal: "next",
      text: "Submitted!"
    }
  };




  function renderFormItems(val:number): IComponentToRender {
      return componentToRender[val];
  }




  return (
    <FormProvider>
      <div>
          <ListNavBar/>
          {renderFormItems(val).component}
          <LinearProgress
              color='inherit'
              variant='determinate'
              value={val}
              style={{marginBottom: '10px'}}
              />
          <FormFooter
            nextStep={setVal}
            newVal={val}
            text={renderFormItems(val).text}
            classVal={renderFormItems(val).classVal}
            count={count}
            setCount={setCount}
            setCheck={setCheck}
            check={checkMark}
            />
      </div>
    </FormProvider>
  );
}

export default NewSpot;
