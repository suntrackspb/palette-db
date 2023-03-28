import {Box} from "@mui/material";
import {observer} from "mobx-react-lite";
import UserProfile from "../components/UserProfile/UserProfile.jsx";
import EditUserProfile from "../components/EditUserProfile/EditUserProfile.jsx";
import useAuth from "../hooks/useAuth.js";


const UserProfilePage = () => {
  const {store} = useAuth()

  return (
    <Box className='flex-sb' sx={{gap: 2}}>
      <UserProfile data={store.user}/>
      <EditUserProfile data={store.user}/>
    </Box>
  );
};

export default observer(UserProfilePage);