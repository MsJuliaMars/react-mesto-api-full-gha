import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  children,
  onClose,
  textButton,
  onSubmit,
}) {
  const handleCloseOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={handleCloseOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close popup__close-button"
          type="button"
          aria-label="Сохранить изменения"
          onClick={onClose}
        ></button>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup-${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__save-button"
            type="submit"
            aria-label="Закрывает, но не сохраняет"
          >
            {textButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;