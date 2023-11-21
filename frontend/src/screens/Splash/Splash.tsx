import { Divider } from "@mui/material";
import Spots from "../../components/Spots/Spots";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";


const Splash = () => {
  return (
    <>
      <NavBar />
      <Divider/>
      <div style={{marginTop: '30px', marginInline: '45px'}}>
        <Spots />
      </div>
       <Divider />
      <Footer />
    </>
  );
}


export default Splash;
