import React, {useRef, useState, useContext} from 'react';
import {AppContext} from '../context/app/AppContext';
import {useHistory} from 'react-router-dom';
import {Button} from './Button';

export const FilesUploader = () => {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const {uploadImages} = useContext(AppContext);

  const uploadInput = useRef(null);

  const onFileChange = (event) => {
    setError(null);
    console.log(event.target.files[0]);
    if (event.target.files?.[0] && event.target.files[0].type ===
        'application/json') {
      setFile(event.target.files[0]);
    } else {
      setError('Файл не выбран или имеет неверный тип.');
    }
    ;
  };
  const onFileUpload = (file) => {
    uploadImages(file).then(() => {
      history.push('/gallery');
    }).catch(error => setError(error));
  };

  return (
      <div className={'files_upload_provider'}>
        <div className={'files_upload_provider__form'}>
          <div className={'files_upload_provider__description_wrapper'}>
            <p className={'files_upload_provider__description'}>Для выбора файла
              нажмите на эту область</p>
            <p className={'files_upload_provider__subtitle'}>(Выберите файл json
              со списком изображений)</p>
            {file &&
            <p className={'files_upload_provider__subtitle green'}>Выбран
              файл: {file.name}</p>}
            {error &&
            <p className={'files_upload_provider__subtitle red'}>{error}</p>}
            <input
                ref={uploadInput}
                className={'files_upload_provider__click_input'}
                type="file" onChange={onFileChange}/>
          </div>
          <Button disabled={!file}
                  moreClassName={'files_upload_provider__upload_button'}
                  title={'Загрузить изображения в галлерею'}
                  onClick={() => onFileUpload(file)}/>
        </div>
      </div>
  );
};
