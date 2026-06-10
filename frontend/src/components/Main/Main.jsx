import { useContext } from "react";
import pencil from '../../images/pencil.svg'
import plus from '../../images/plus.svg'
import Popup from "./Popup/Popup.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import Card from "../Card/Card.jsx";
import EditAvatar from "../EditAvatar/EditAvatar.jsx"
import EditProfile from "../EditProfile/EditProfile.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({ onOpenPopup, onClosePopup, popup, cards, onCardLike, onCardDelete, onAddPlaceSubmit }) { 
  const { currentUser } = useContext(CurrentUserContext);

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar Foto de Perfil",
    children: <EditAvatar />,
  };
  const newCardPopup = { 
    title: "Nuevo lugar", 
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />
  };

  return (  
    <main className="main">
      <section className="profile">
        <div className="profile__image_edit" onClick={() => onOpenPopup(editAvatarPopup)}>
          <img className="profile__image" src={currentUser.avatar} alt="profile"/>
        </div>
        <div className="profile__border-box">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="edit__button" onClick={() => onOpenPopup(editProfilePopup)}>
              <img src={pencil} alt="edit" />
            </button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button aria-label="Add card" className="profile__add-button" type="button"
          onClick={() => onOpenPopup(newCardPopup)}>
          <img src={plus} alt="add" />
        </button>
      </section>  

      <ul className="cards__list">
        {cards.map((card) => (
          <Card key={card._id} card={card} 
            handleOpenPopup={onOpenPopup}
            handleClosePopup={onClosePopup}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike} 
          />
        ))}
      </ul>

      <Popup onClose={onClosePopup} title={popup?.title} isOpen={!!popup}>
        {popup?.children}
      </Popup>
    </main>
  );
}

export default Main;