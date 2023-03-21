import {useEffect} from "react";
import ReactCrop, {makeAspectCrop} from "react-image-crop";
import {Box, Button, Typography} from "@mui/material";
import {sizes} from "../../data.js";

const Crop = ({imageSettings, setImageSettings, crop, setCrop, file}) => {

  useEffect(() => {
    const newCrop = {
      unit: 'px',
      x: 0,
      y: 0,
      width: imageSettings.ratio > 1 ? sizes.landscape.minWidth : sizes.portrait.minWidth,
      height: imageSettings.ratio > 1 ? sizes.landscape.minHeight : sizes.portrait.minHeight
    }
    setCrop(newCrop)
  }, [imageSettings.ratio])

  function onImageLoad(e) {
    const {naturalWidth: width, naturalHeight: height} = e.currentTarget;
    let aspect = width >= height ? sizes.landscape.ratio : sizes.portrait.ratio
    const crop = makeAspectCrop({
      unit: 'px',
      width: aspect > 1 ? sizes.landscape.minWidth : sizes.portrait.minWidth,
      height: aspect > 1 ? sizes.landscape.minHeight : sizes.portrait.minHeight
    }, aspect, width, height)
    setCrop(crop)
  }

  const getContainerSize = () => {
    let containerWidth = imageSettings.width / imageSettings.scale
    let containerHeight = imageSettings.height / imageSettings.scale
    return {width: containerWidth, height: containerHeight}
  }

  const toggle = () => {
    setImageSettings({
      ...imageSettings,
      ratio: imageSettings.ratio === sizes.portrait.ratio
        ? sizes.landscape.ratio
        : sizes.portrait.ratio
    })
  }

  return (
    <>
      <Button color='secondary' variant='contained' onClick={toggle} sx={{alignSelf: 'start'}}>
        <Typography component='span' variant='body2'>
          Повернуть область
        </Typography>
      </Button>
      <ReactCrop keepSelection minWidth={sizes.minWidth} minHeight={sizes.minHeight} aspect={imageSettings.ratio}
                 crop={crop} onChange={c => setCrop(c)}>
        <img style={getContainerSize()} src={file} alt='img' onLoad={onImageLoad}/>
      </ReactCrop>
    </>
  );
};

export default Crop;