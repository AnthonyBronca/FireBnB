import React from 'react';
import InitialForm from './InitialForm';
import ListNavBar from '../../components/Navigation/ListNavBar';
import Footer from '../../components/Footer/Footer';
import FormFooter from './FormFooter';
const NewSpot: React.FC = (): JSX.Element => {

  document.title = "Create your listing - Firebnb"


  return (
    <div>
        <ListNavBar />
        <InitialForm />
    </div>
  );
}

export default NewSpot;
