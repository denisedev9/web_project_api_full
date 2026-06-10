import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import api from './utils/api';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  function handleOpenPopup(popup) { setPopup(popup); }
  function handleClosePopup() { setPopup(null); }

  useEffect(() => {
    api.getUserInfo()
      .then((data) => { setCurrentUser(data); })
      .catch((err) => { console.log(err); });

    api.getInitialCards()
      .then((data) => { setCards(data); })
      .catch((err) => { console.log(err); });
  }, []);

  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateAvatar = (data) => {
    api.editUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
      })
      .catch((error) => console.error(error));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    const likeMethod = isLiked ? api.removeLikeCard : api.likeCard;
    likeMethod.call(api, card._id)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => 
          currentCard._id === card._id ? newCard : currentCard
        ));
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(name, link) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Main 
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
              <Footer />
            </>
          } />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;