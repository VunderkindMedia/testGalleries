import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
                  color = '#16a085',
                  moreClassName,
                  title = 'Button',
                  onClick = () => {
                  },
                  disabled = false,
                }) => {
  return (
      <div style={{backgroundColor: disabled ? '#6c6c6c' : color}}
           className={moreClassName ? `button ${moreClassName}` : 'button'}
           onClick={() => {
             !disabled && onClick();
           }}>{title}</div>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  moreClassName: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export {Button};
