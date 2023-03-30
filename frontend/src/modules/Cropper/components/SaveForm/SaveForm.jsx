import {useNavigate} from "react-router-dom";
import {Autocomplete, Box, Button, TextField, Typography} from "@mui/material";
import PaletteService from "../../../../api/PaletteService.js";

const SaveForm = ({croppedImage, tags, selectedTags, setSelectedTags, store}) => {
  const navigate = useNavigate()

  const saveCroppedImage = e => {
    e.preventDefault()
    const data = {
      image_b64: croppedImage.imageBase64,
      colors: croppedImage.colors,
      tags: selectedTags,
      login: store.user.login
    }
    console.log(data)

    PaletteService.savePalette(data)
      .then(res => {
        console.log(res)
        navigate(`/palette/${res.$oid}`)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <img style={{width: 'auto'}} src={croppedImage.imageSrc} alt="#"/>

      <Box
        component='form'
        onSubmit={saveCroppedImage}
        className='flex-col'
        width='100%'
        sx={{gap: 2}}
        >
        <Autocomplete
          sx={{maxWidth: '450px'}}
          multiple
          id="tags-outlined"
          options={tags}
          onChange={(e, value) => setSelectedTags(value)}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Выберите теги"
              placeholder="Теги"
            />
          )}
        />
        <Button
          disabled={!selectedTags.length}
          type='submit'
          variant='contained'
          color='secondary'>
          <Typography variant='span'>
            Отправить
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default SaveForm;