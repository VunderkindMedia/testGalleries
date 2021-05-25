import React, {useReducer} from 'react';
import {AppContext} from './AppContext';
import AppReducer, {initialState} from './AppReducer';
import {SET_IMAGES} from './types';

export const AppState = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const dragUploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      let imageObject;
      const images = state.images;
      const img = new Image();

      img.src = URL.createObjectURL(image);
      img.onload = function() {
        imageObject = {
          width: img.naturalWidth,
          height: img.naturalHeight,
          url: img.src,
        };
        images.push(imageObject);
        dispatch({
          type: SET_IMAGES,
          images: images,
        });
        resolve(images);
      };
    });
  };
  const uploadImages = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file, 'utf8');
      reader.onload = function(e) {
        const fileContent = JSON.parse(e.target.result);
        if (fileContent.galleryImages) {
          dispatch({
            type: SET_IMAGES,
            images: [...state.images, ...fileContent.galleryImages],
          });
          resolve(state.images);
        } else {
          reject('Неверная структура файла');
        }
      };
    });
  };

  return (
      <AppContext.Provider
          value={{
            images: state.images,
            dragUploadImage,
            uploadImages,
          }}
      >
        {children}
      </AppContext.Provider>
  );
};
