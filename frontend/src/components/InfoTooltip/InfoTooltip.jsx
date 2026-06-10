import React from 'react';
import '../../blocks/info-tooltip.css';
import closeIcon from '../../images/X.svg';
import successIcon from '../../images/yes.svg';
import failIcon from '../../images/no.svg';

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container_info-tooltip">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" />
        </button>
        <img 
          className="popup__icon" 
          src={isSuccess ? successIcon : failIcon} 
          alt={isSuccess ? "Éxito" : "Error"} 
        />
        <h2 className="popup__status-message">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;