import {colorsArr} from "../../consts/index.js";

export const styles = {
  img: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    objectPosition: 'center',
    borderRadius: '50%'
  },
  noImg: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorsArr[Math.floor(Math.random() * colorsArr.length)],
    color: '#000',
    fontSize: '36px'
  }
}