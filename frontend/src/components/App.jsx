import Footer from "components/Footer.jsx";
import ImagePopup from "components/ImagePopup.jsx";
import Main from "components/Main.jsx";
import PopupAddNewPlace from "components/PopupAddNewPlace.jsx";
import PopupDeleteCard from "components/PopupDeleteCard.jsx";
import PopupEditAvatar from "components/PopupEditAvatar.jsx";
import PopupEditProfile from "components/PopupEditProfile.jsx";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header.jsx";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as apiAuth from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // для отслеживания загрузки во время ожидагия от сервера ответа

  // Авторизация
  const [loggedIn, setLoggedIn] = useState(false);
  const [successRegister, setSuccessRegister] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const login = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    apiAuth
      .authorize(email, password)
      .then((data) => {
        if (data?.token) {
          localStorage.setItem("jwt", data.token);
          login();
          api.setToken(data.token); // передает в api новое значение токена
          setEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessRegister(false);
        setIsInfoTooltipPopupOpen(true);
      });
  };

  const handleRegister = ({ email, password }) => {
    apiAuth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setSuccessRegister(true);
          navigate("/sign-in");
        } else {
          setSuccessRegister(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccessRegister(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  };

  // сброс параметров после "выхода", удаление токена
  const handleLogout = () => {
    logout();
    setEmail(null);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  //сохранение токена в локальном хранилище и передача email
  useEffect(() => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          // авторизуем пользователя
          login();
          setEmail(res.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipPopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id); // снова проверяем, есть ли уже лайк на этой карточке
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
        .changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleCardDelete = (card) => {
    //удаление карточки
    api
      .deleteCard(card)
      .then((_id) => {
        setCards((cards) => cards.filter((item) => item._id !== card));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // получение данных о пользователе
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    // получение карточек с сервера
    if (loggedIn) {
      api
        .downloadingCards()
        .then((res) => setCards(res))
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleUpdateAvatar = useCallback(
    (avatarData) => {
      setIsLoading(true);
      api
        .setUserAvatar(avatarData)
        .then((newData) => {
          setCurrentUser(newData);
          closeAllPopups();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    },
    [closeAllPopups]
  );

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo(userData)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .setCard({ name, link })
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={email} onLogout={handleLogout} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              >
                {" "}
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          >
            {" "}
          </Route>
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          >
            {" "}
          </Route>
        </Routes>
        <Footer />
        <PopupEditAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <PopupEditProfile
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupAddNewPlace
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupDeleteCard
          // isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          successRegister={successRegister}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
