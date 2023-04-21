import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import CookieAlert from "../components/CookieAlert/CookieAlert.jsx";

const Layout = () => {
  return (
    <>
      <Header/>

      <Container component='main' maxWidth='xl' sx={{pb: 2}}>
        <Outlet/>
        <CookieAlert/>
      </Container>

      <Footer/>
    </>
  );
};

export default Layout;