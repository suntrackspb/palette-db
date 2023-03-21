import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import LoginForm from "../components/LoginForm/LoginForm.jsx";
import useModal from "../hooks/useModal.js";

const Layout = () => {
  return (
    <>
      <Header/>

      <Container component='main' maxWidth='xl' sx={{pb: 2}}>
        <Outlet/>
      </Container>

      <Footer/>
    </>
  );
};

export default Layout;