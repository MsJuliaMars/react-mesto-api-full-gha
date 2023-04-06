import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.jsx";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser?.avatar}
          alt="Аватар пользователя"
        />
        <button
          className="profile__avarat-btn"
          type="button"
          onClick={onEditAvatar}
        ></button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__title">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Сохранить изменения"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards">
        <ul className="cards__items">
          {cards?.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              // onDeleteCardClick={onDeleteCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;