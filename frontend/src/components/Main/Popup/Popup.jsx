import { useEffect } from "react";
import imagex from "../../../images/x.svg";
import '../../../blocks/popup.css';

export default function Popup({ onClose, title, children, isOpen }) {
  const contentClass = `popup__content ${!title ? 'popup__content_type_image' : ''}`;
  const popupClass = `popup ${isOpen ? 'popup_opened' : ''}`;

  useEffect(() => {
    function handleEscClose(e) {
      if (e.key === 'Escape') onClose();
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <div className={popupClass}>
      <div className="popup__wrapper">
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img src={imagex} alt="close" />
        </button>
        <div className={contentClass}>
          {title && <h3 className="popup__title">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
}