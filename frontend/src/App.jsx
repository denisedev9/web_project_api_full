import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";
import * as auth from './utils/auth.js';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Footer from './components/Footer/Footer.jsx';
import Main from './components/Main/Main.jsx';
import Header from './components/Header/Header.jsx';
import InfoTooltip from './components/InfoTooltip/InfoTooltip.jsx';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import api from './utils/api.js';
import CurrentUserContext from './contexts/CurrentUserContext.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((data) => { setCurrentUser(data); })
        .catch((err) => { console.log(err); });

      api.getInitialCards()
        .then((data) => {
          setCards(data.map((card) => ({
            ...card,
            isLiked: card.likes.some((like) => like === currentUser._id || like._id === currentUser._id),
          })));
        })
        .catch((err) => { console.log(err); });
    }
  }, [isLoggedIn]);

  function handleOpenPopup(popup) { setPopup(popup); }
  function handleClosePopup() { setPopup(null); setIsInfoTooltipOpen(false); }

  const handleRegister = useCallback((email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }, [navigate]);

  const handleLogin = useCallback((email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/signin');
  }

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
          currentCard._id === card._id
            ? {
                ...newCard,
                isLiked: newCard.likes.some((like) => like === currentUser._id || like._id === currentUser._id),
              }
            : currentCard
        ));
      })
      .catch((error) => console.error(error));
  }

  function handleAddPlaceSubmit(name, link) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([{ ...newCard, isLiked: false }, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  if (isCheckingToken) {
    return null;
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        userEmail={currentUser.email}
      />
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute loggedIn={isLoggedIn}>
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
            </ProtectedRoute>
          } />
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CurrentUserContext.Provider>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleClosePopup}
        isSuccess={isSuccess}
        message={isSuccess ? "¡Correcto! Ya estás registrado." : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      />
    </div>
  );
}

export default App;