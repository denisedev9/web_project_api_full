import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heart from "../../images/heart.svg";
import heartblack from "../../images/heartblack.svg";
import trash from "../../images/trash.svg";


export default function Card({ card, handleOpenPopup, handleClosePopup, onCardDelete, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link, isLiked } = card;
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

function handleDeleteClick() {
  onCardDelete(card);
}

  function handleImageClick() {
    handleOpenPopup({
      title: "", // vacío porque es solo la imagen
      children: <img src={link} alt={name} className="popup__image" />,
      onClose: handleClosePopup, // ✅ muy importante para cerrar
    });
  }

  

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleImageClick}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img src={trash} alt="delete" />
      </button>

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName} 
          onClick={handleLikeClick}
        >
         <img src={isLiked ? heartblack : heart} alt="like" />
        </button>
      </div>
    </li>
  );
}