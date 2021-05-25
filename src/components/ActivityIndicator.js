import PropTypes from 'prop-types';
import React from 'react';

const ActivityIndicator = ({
                             color = '#68af58',
                             size = 80,
                           }) => {
  const circles = [...Array(4)].map(
      (_, index) => <div key={index} style={{background: `${color}`}}/>);

  return (
      <div className={'activity_indicator'}>
        <div className={'activity_indicator__indicator'}
             style={{width: size, height: size}}>
          {circles}
        </div>
      </div>
  );
};
ActivityIndicator.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export {ActivityIndicator};
