import LoginForm from "../components/LoginForm/LoginForm.jsx";
import {getCookie} from "../utils/cookie.js";
import {Navigate, useLocation, useParams, useResolvedPath} from "react-router-dom";

const LoginPage = () => {

  if (getCookie('csrf_access_token')) {
    return <Navigate to='/'/>
  }

  return (
    <>
      <LoginForm/>
    </>
  );
};

export default LoginPage;