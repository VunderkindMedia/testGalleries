import React, {useRef, useState, useContext} from 'react';
import {AppContext} from '../context/app/AppContext';
import {useHistory} from 'react-router-dom';
import {Button} from './Button';
import {DDUploadProvider} from './DDUploadProvider';

export const FilesUploader = () => {
  const history = useHistory();
  const [imageFiles, setImageFiles] = useState([]);
  const [jsonFiles, setJsonFile] = useState(null);
  const [jsonError, setJsonError] = useState(null);
  const [url, setURL] = useState('');
  const [error, setError] = useState(null);
  const {uploadImages, dragUploadImage, onUploadFromUrl} = useContext(
      AppContext);
  const uploadInput = useRef(null);

  const onFileChange = (files) => {
    setError(null);
    setJsonError(null);
    if (files.length > 0) {
      if (Object.values(files)
          .some(file => file.type === 'image/jpeg' || file.type ===
              'image/png')) {
        setJsonFile(null);
        setImageFiles(Object.values(files)
            .filter(file => file.type === 'image/jpeg' || file.type ===
                'image/png'));
      } else {
        setImageFiles([]);
        setError('Файл имеет неверный тип.');
      }
    } else {
      setError('Файлы не выбраны.');
    }
  };
  const onFileJSONChange = (files) => {
    console.log(files);
    setError(null);
    setJsonError(null);
    if (files.length > 0) {
      if (files[0].type === 'application/json') {
        setImageFiles([]);
        setJsonFile(files[0]);
      } else {
        setJsonFile(null);
        setJsonError('Файл имеет неверный тип.');
      }
    } else {
      setError('Файлы не выбраны.');
    }
  };
  const onFileUpload = (file) => {
    if (file.type === 'application/json') {
      uploadImages(file).then(() => {
        history.push('/gallery');
      }).catch(error => setJsonError(error));
    } else {
      dragUploadImage(file);
      history.push('/gallery');
    }
  };
  const onChangeURL = (value) => {
    if (jsonFiles || imageFiles) {
      setJsonFile(null);
      setImageFiles([]);
    }
    setURL(value);
  };
  const submit = () => {
    if (imageFiles.length !== 0) {
      console.log('image');
      onFileUpload(imageFiles);
    } else if (jsonFiles) {
      console.log('json');
      onFileUpload(jsonFiles);
    } else {
      onUploadFromUrl(url);
      history.push('/gallery');
    }
  };

  return (
      <div className={'files_upload_provider'}>
        <div className={'files_upload_provider__form'}>
          <div className={'files_upload_provider__description_wrapper'}>
            <DDUploadProvider onChange={(files) => onFileChange(files)}>
              <p className={'files_upload_provider__description'}>Для выбора
                файлов
                нажмите на эту область или перетяните изображения</p>
              <p className={'files_upload_provider__subtitle'}>(Выберите файлы
                изображений)</p>
              {imageFiles && imageFiles.map((file, i) => {
                return <p key={file.name + i}
                          className={'files_upload_provider__subtitle green'}>{i +
                1}. {file.name}</p>;
              })
              }
              {error &&
              <p className={'files_upload_provider__subtitle red'}>{error}</p>}
              <input
                  ref={uploadInput}
                  className={'files_upload_provider__click_input'}
                  type="file" onChange={e => onFileChange(e.target.files)}
                  multiple
              />
            </DDUploadProvider>
          </div>
          <p className={'files_upload_provider__subtitle'}>- или -</p>
          <input className={'files_upload_provider__url_input'}
                 placeholder={'Введите URL изображения'}
                 onChange={e => onChangeURL(e.target.value)}/>
          <p className={'files_upload_provider__subtitle'}>- или -</p>
          <label className={'files_upload_provider__json_wrapper'}>
            <input name="file" type="file"
                   className="files_upload_provider__json_input"
                   onChange={e => onFileJSONChange(e.target.files)}/>
            <div
                className={'files_upload_provider__json_div button '}>Обзор...
            </div>
            <p style={{flex: 1}}
               className={`files_upload_provider__subtitle ${jsonError &&
               'red'} ${jsonFiles && 'green'}`}>{jsonError || jsonFiles?.name ||
            'Выбрать JSON файл'}</p>
          </label>
          <Button disabled={!imageFiles}
                  moreClassName={'files_upload_provider__upload_button'}
                  title={'Загрузить изображения в галлерею'}
                  onClick={submit}
          />
        </div>
      </div>
  );
};
