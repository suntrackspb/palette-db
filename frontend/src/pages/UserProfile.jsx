import useAuth from "../hooks/useAuth.js";
import ContentBlock from "../components/ContentBlock/ContentBlock.jsx";

const UserProfile = () => {
  const {store} = useAuth()

  return (
    <ContentBlock>

    </ContentBlock>
  );
};

export default UserProfile;