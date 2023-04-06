import React from "react";

function ImagePopup({ card, onClose }) {
  const handleCloseOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_picture ${
        (card?.name || card?.link) && "popup_opened"
      } popup_overlay `}
      onClick={handleCloseOverlayClick}
    >
      <div className="popup__picture-container">
        <button
          className="popup__close popup__picture-close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={card?.name} src={card?.link} />
        <h2 className="popup__picture-title">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
