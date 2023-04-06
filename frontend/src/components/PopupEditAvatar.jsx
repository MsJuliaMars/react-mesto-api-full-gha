import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupEditAvatar({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <label className="popup__field">
        <input
          type="url"
          name="image"
          className="popup__text popup__text_link"
          id="popup-links"
          ref={avatarRef}
          defaultValue=""
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup-links-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;