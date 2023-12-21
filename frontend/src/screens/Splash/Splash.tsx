import { Divider } from "@mui/material";
import Spots from "../../components/Spots/Spots";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import React from "react";
import LoginModal from "../../components/Modals/LoginModal";
import { useAppSelector } from "../../store";
// import { Navigate, useNavigate } from "react-router-dom";

interface ISplashProps {
  login?: boolean
}

const Splash: React.FC<ISplashProps> = ({login}): JSX.Element => {
  // const navigate = useNavigate();
  const user = useAppSelector((state) => state.session.user);

  const allowList = () => {
    if(user){
      return null;
    } else{
      return <LoginModal menuOption="login"/>
    }
  }



  return (
    <>
      <NavBar />
      <Divider/>
      <div style={{marginTop: '30px', marginInline: '45px'}}>
        <Spots />
        {login? allowList() : null}
      </div>
       <Divider />
      <Footer />
    </>
  );
}


export default Splash;
