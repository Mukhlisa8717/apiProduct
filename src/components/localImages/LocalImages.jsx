import React, {memo} from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import './LocalImages.scss'

const LocalImages = ({ files, setFiles }) => {
  const handleRemoveImage = (index) => {
    setFiles((prev) => [...prev].filter((_, inx) => inx !== index))
  };

  return (
    <div className="local__images">
      {Object.values(files)?.map((image, index) => (
        <div key={index} className="local__image">
          <img src={URL.createObjectURL(image)} width={100} alt="" />
          <IoMdCloseCircle onClick={() => handleRemoveImage(index)} />
        </div>
      ))}
    </div>
  );
};

export default memo(LocalImages)
