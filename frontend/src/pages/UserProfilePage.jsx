import {Box} from "@mui/material";
import UserProfile from "../components/UserProfile/UserProfile.jsx";
import EditUserProfile from "../components/EditUserProfile/EditUserProfile.jsx";


const UserProfilePage = () => {

  return (
    <Box sx={{display: 'flex', gap: 2, mt: 2, justifyContent: 'center'}}>
      <UserProfile />
      <EditUserProfile />
    </Box>
  );
};

export default UserProfilePage;