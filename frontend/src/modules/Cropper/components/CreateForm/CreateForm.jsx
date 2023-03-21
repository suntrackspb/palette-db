import React, {useState} from 'react';
import {Button, FormLabel, Typography} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import {sizes} from "../../data.js";
import PaletteService from "../../../../api/PaletteService.js";

const CreateForm = ({imageSettings, setImageSettings, file, setFile, setCroppedImage, crop, setLoading}) => {
  const [fileObject, setFileObject] = useState({});

  const handleImageLoad = e => {
    const file = e.target.files[0]
    if (file) {
      setAspectOnUploadedImg(file)
    }
  }

  const setAspectOnUploadedImg = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = () => {
        const {width, height} = image

        if (width < sizes.landscape.minWidth || height < sizes.portrait.minHeight) {
          alert(`Минимальное разрешение ${sizes.landscape.minWidth}px x ${sizes.portrait.minHeight}px`)
          return;
        }

        width <= height
          ? setImageSettings({
            ratio: sizes.portrait.ratio,
            scale: height / 800,
            width,
            height,
            mime: (file.type.split('/')).at(-1)
          })
          : setImageSettings({
            ratio: sizes.landscape.ratio,
            scale: width / 1200,
            width,
            height,
            mime: (file.type.split('/')).at(-1)
          })

        setFile(URL.createObjectURL(file))
        setFileObject(file)
      };
    };
  }

  const sendCroppedImage = e => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    const data = {
      ...crop,
      realWidth: imageSettings.width,
      realHeight: imageSettings.height,
      scale: imageSettings.scale,
      mime: imageSettings.mime
    }
    formData.append('file', fileObject)
    formData.append('data', JSON.stringify(data))

    PaletteService.createPalette(formData)
      .then(handleCroppedImage)
      .catch(err => console.log(err))
      .finally(() => setLoading(false))

  }

  const handleCroppedImage = (res) => {
    setCroppedImage({
      imageSrc: `data:image/jpeg;base64,${res.image}`,
      colors: res.colors,
      imageBase64: res.image
    })
  }

  return (
    <form onSubmit={sendCroppedImage}>
      <FormLabel className='flex-c' sx={{gap: 2}}>
        <Button variant="contained" color='secondary' component="label" endIcon={<UploadIcon/>}>
          <Typography component='span'>Выберите файл</Typography>
          <input hidden name='image' accept="image/png, image/jpg, image/jpeg" type="file" onChange={handleImageLoad}/>
        </Button>
        {fileObject.name && fileObject.name}
      </FormLabel>

      {file &&
        <Button color='secondary' variant='contained' type='submit' sx={{mt: 2, mx: 'auto', display: 'block'}}>
          <Typography component='span'>
            Отправить
          </Typography>
        </Button>}
    </form>
  );
};

export default CreateForm;