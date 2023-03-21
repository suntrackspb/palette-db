import Store from "../store/store.js";
import {createContext} from "react";

const store = new Store()
export const AuthContext = createContext({store})

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{store}}>
      {children}
    </AuthContext.Provider>
  )
}