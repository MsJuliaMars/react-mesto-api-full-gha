import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    name,
    _id,
    owner: { _id: ownerId },
    link,
  } = card;
  const likes = card.likes.map((like) => like._id);
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const isOwn = ownerId === currentUser?._id;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button
        className={`${isOwn ? "card__del-button" : "card__del-button_remove"}`}
        type="submit"
        aria-label="Удалить карточку"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="card__image"
        alt={name}
        src={link}
        onClick={handleClick}
      />
      <div className="card__group">
        <h2 className="card__title">{name}</h2>
        <div className="card__like-container">
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            type="button"
            aria-label="Сердце"
            onClick={handleLikeClick}
          ></button>
          <h3 className="card__like-count">{likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
