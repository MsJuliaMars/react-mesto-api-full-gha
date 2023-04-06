import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupEditProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({ title: "", subtitle: "" });

  useEffect(() => {
    if (currentUser.name && currentUser.about && isOpen) {
      setValues({
        title: currentUser.name,
        subtitle: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);

  const onChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы

    onUpdateUser({
      // Передаём значения управляемых компонентов во внешний обработчик
      name: values.title,
      about: values.subtitle,
    });
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      textButton="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
          className="popup__text popup__text_name"
          id="popup-title"
          placeholder="Введите имя"
          // @ts-ignore
          minLength="2"
          // @ts-ignore
          maxLength="40"
          required
        />
        <span className="popup-title-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          name="subtitle"
          value={values.subtitle}
          onChange={onChange}
          className="popup__text popup__text_job"
          id="popup-job"
          placeholder="Расскажите о себе"
          // @ts-ignore
          minLength="2"
          // @ts-ignore
          maxLength="200"
          required
        />
        <span className="popup-job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupEditProfile;