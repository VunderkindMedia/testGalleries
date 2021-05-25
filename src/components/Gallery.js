import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../context/app/AppContext';
import {ActivityIndicator} from './ActivityIndicator';
import {Button} from './Button';
import {DDUploadProvider} from './DDUploadProvider';
import {useHistory} from 'react-router-dom';

export const Gallery = () => {
  const history = useHistory();
  const {images} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const moreHandler = () => {
    history.replace('/');
  };
  return (
      <DDUploadProvider>
        {loading ? <ActivityIndicator/> :
            <div className={'gallery'}>
              <Button title={'Загрузить еще'} moreClassName={'gallery__more'}
                      onClick={moreHandler}/>
              <div className={'gallery__layout'}>
                {
                  images.map((image, index) => {
                    return <div key={image.url + index}
                                className={'gallery__image_wrapper'}>
                      <img
                          className={'gallery__image'}
                          alt={'description'}
                          src={image.url}
                      />
                    </div>;
                  })
                }
              </div>
            </div>}
      </DDUploadProvider>
  );
};
