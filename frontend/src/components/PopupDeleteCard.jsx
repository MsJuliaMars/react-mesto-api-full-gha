import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteCard({ isOpen, onClose }) {
  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Да"
    ></PopupWithForm>
  );
}

export default PopupDeleteCard;
