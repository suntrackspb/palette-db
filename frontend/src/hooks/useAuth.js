import {useContext} from "react";
import {AuthContext} from "../hoc/AuthProvider.jsx";

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth