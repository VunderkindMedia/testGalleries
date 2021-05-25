import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../context/app/AppContext';
import {ActivityIndicator} from './ActivityIndicator';
import {Button} from './Button';
import {DDUploadProvider} from './DDUploadProvider';
import {useHistory} from 'react-router-dom';
import {DeleteButton} from './DeleteButton';

export const Gallery = () => {
  const history = useHistory();
  const {images, deleteImage} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const moreHandler = () => {
    history.replace('/');
  };

  const deleteHandler = (index) => {
    deleteImage(index);
  };
  return (
      <DDUploadProvider>
        {loading ? <ActivityIndicator/> :
            <div className={'gallery'}>
              {
                images.length > 0 &&
                <Button title={'Загрузить еще'} moreClassName={'gallery__more'}
                        onClick={moreHandler}/>
              }
              <div className={'gallery__layout'}>
                {images.length > 0 ?
                    images.map((image, index) => {
                      return <div key={image.url + index}
                                  className={'gallery__image_wrapper'}>
                        <img
                            className={'gallery__image'}
                            alt={'description'}
                            src={image.url}
                        />
                        <DeleteButton prefix={'gallery'}
                                      question={'Вы действительно хотите удалить данное изображение?'}
                                      icon={'fa fa-trash'} title={'Удалить'}
                                      onClick={() => deleteHandler(index)}/>
                      </div>;
                    }) : <div className={'gallery__is_empty'}>
                      <p>Изображения отсутствуют</p>
                      <Button title={'Загрузить изображения'} moreClassName={''}
                              onClick={moreHandler}/>
                    </div>
                }
              </div>
            </div>}
      </DDUploadProvider>
  );
};
