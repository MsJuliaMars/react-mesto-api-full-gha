import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddNewPlace({ isOpen, onClose, onAddPlace }) {
  const [values, setValues] = useState({ place: "", image: "" });

  React.useEffect(() => {
    setValues({
      place: "",
      image: "",
    });
  }, [isOpen]);

  const onChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Запрещаем браузеру переходить по адресу формы

    onAddPlace({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: values.place,
      link: values.image,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Создать"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          name="place"
          value={values.place}
          onChange={onChange}
          className="popup__text popup__text_place"
          id="popup-name"
          placeholder="Название"
          // @ts-ignore
          minLength="2"
          // @ts-ignore
          maxLength="30"
          required
        />
        <span className="popup-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          name="image"
          value={values.image}
          onChange={onChange}
          className="popup__text popup__text_link"
          id="popup-link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupAddNewPlace;
