import {useState} from 'react';
import 'react-image-crop/dist/ReactCrop.css'

import Crop from './components/Crop/Crop.jsx'
import CreateForm from "./components/CreateForm/CreateForm.jsx";
import SaveForm from "./components/SaveForm/SaveForm.jsx";
import {ContentBlock, Loader} from "../../components/UI";


const Cropper = ({store}) => {
  const [file, setFile] = useState('')
  const [crop, setCrop] = useState({unit: 'px', x: 0, y: 0, width: 50, height: 50})
  const [imageSettings, setImageSettings] = useState({ratio: 1, scale: 0, width: 0, height: 0})
  const [croppedImage, setCroppedImage] = useState({colors: [], imageBase64: '', imageSrc: ''})

  const tags = JSON.parse(localStorage.getItem('tags'))
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <ContentBlock styleProps={{width: 'fit-content', margin: '0 auto', flexDirection: 'column'}}>

      {!croppedImage.imageSrc &&
        <CreateForm
          imageSettings={imageSettings}
          setImageSettings={setImageSettings}
          file={file}
          setFile={setFile}
          setCroppedImage={setCroppedImage}
          crop={crop}
          setLoading={setLoading}
        />}

      {file && !croppedImage.imageSrc &&
        <Crop
          imageSettings={imageSettings}
          setImageSettings={setImageSettings}
          crop={crop}
          setCrop={setCrop}
          file={file}
        />}


      {croppedImage.imageSrc &&
        <SaveForm
          croppedImage={croppedImage}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          tags={tags}
          store={store}
        />}

      {loading && <Loader isLoading={loading}/>}

    </ContentBlock>
  );
};

export default Cropper;