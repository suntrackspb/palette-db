import React from 'react';
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import UserService from "../../api/UserService.js";
import {cryptoPass} from "../../utils/crypto.js";

const EditUserProfile = ({data}) => {
  const {login, avatar, create, favorite, block} = data
  const handleClick = () => {
    const userData = {
      login,
      password: cryptoPass('qwerty'),
      avatar: 'https://faaalc.ru/img/avatar.jpg',
      create,
      favorite: [...favorite],
      block,
    }
    console.log(userData)
    // UserService.setUserInfo(userData)
    //   .then(console.log)
  }

  return (
    <ContentBlock>
      <button onClick={handleClick}>click</button>
    </ContentBlock>
  );
};

export default EditUserProfile;