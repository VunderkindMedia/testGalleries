import React, {useRef, useEffect, useState, useContext} from 'react';
import {AppContext} from '../context/app/AppContext';

export const DDUploadProvider = ({children}) => {
  const dropRef = useRef(null);
  const [draggable, setDraggable] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const {dragUploadImage} = useContext(AppContext);

  useEffect(() => {
    console.log(dragCounter);
    if (dragCounter === 0) {
      setDraggable(false);
    }
  }, [dragCounter]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    setDraggable(true);
  };
  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggable(false);
    setDragCounter(0);
    dragUploadImage(e.dataTransfer.files[0]);
  };

  useEffect(() => {
    const dragElement = dropRef.current;
    dragElement.addEventListener('dragenter', handleDragIn);
    dragElement.addEventListener('dragleave', handleDragOut);
    dragElement.addEventListener('dragover', handleDrag);
    dragElement.addEventListener('drop', handleDrop);
    return () => {
      dragElement.removeEventListener('dragenter', handleDragIn);
      dragElement.removeEventListener('dragleave', handleDragOut);
      dragElement.removeEventListener('dragover', handleDrag);
      dragElement.removeEventListener('drop', handleDrop);
    };
  }, []);

  return (
      <div className={'dd_upload_provider '} ref={dropRef}>
        {draggable && <div className={'dd_upload_provider__modal'}></div>}
        {children}
      </div>
  );
};
