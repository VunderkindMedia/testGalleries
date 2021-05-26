import React, {useReducer} from 'react';
import {AppContext} from './AppContext';
import AppReducer, {initialState} from './AppReducer';
import {SET_IMAGES} from './types';

export const AppState = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const dragUploadImage = (files) => {
    const images = state.images;
    const newImages = files.map(file => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      return {
        url: img.src,
      };
    });
    dispatch({
      type: SET_IMAGES,
      images: [...images, ...newImages],
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

  const deleteImage = (index) => {
    dispatch({
      type: SET_IMAGES,
      images: state.images.filter((_, i) => i !== index),
    });
  };

  const onUploadFromUrl = (url) => {
    console.log(url);
    dispatch({
      type: SET_IMAGES,
      images: [...state.images, {url: url}],
    });
  };

  return (
      <AppContext.Provider
          value={{
            images: state.images,
            dragUploadImage,
            uploadImages,
            deleteImage,
            onUploadFromUrl,
          }}
      >
        {children}
      </AppContext.Provider>
  );
};
