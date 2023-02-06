import React, { useState } from "react";


const useSelectFile = () => {
  //could be name of the string or the source of the img
  const [selectedFile, setSelectedFile] = useState<string>();

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    //add ? to aviod the undefined array
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
  };

  return { selectedFile, setSelectedFile, onSelectFile };
};

export default useSelectFile;
