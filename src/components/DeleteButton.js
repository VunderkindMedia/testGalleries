import PropTypes from 'prop-types';
import React from 'react';

const DeleteButton = ({question, onClick, icon, color = 'red', prefix}) => {

  return (
      <div className={`${prefix}__delete_btn`} onClick={() => {
        const conf = window.confirm(question);
        conf && onClick();
      }}>
        <i className={icon} style={{color: color}}/>
      </div>
  );
};

DeleteButton.propTypes = {
  color: PropTypes.string,
  prefix: PropTypes.string,
  icon: PropTypes.string,
  question: PropTypes.string,
  onClick: PropTypes.func,
};

export {DeleteButton};
