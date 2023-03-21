import {useLocation, useNavigate} from "react-router-dom";
import {getCookie} from "../utils/cookie.js";
import {useEffect} from "react";
import useAuth from "../hooks/useAuth.js";
import {observer} from "mobx-react-lite";

const RequireAuth = ({element}) => {
  const {store} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!getCookie('csrf_access_token')) {
      navigate('/login', {state: {from: location}})
    }
  }, [store.isAuth]);


  return element
};

export default observer(RequireAuth);