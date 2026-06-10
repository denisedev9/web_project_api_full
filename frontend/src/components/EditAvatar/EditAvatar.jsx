import { useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
  e.preventDefault();
  handleUpdateAvatar({ avatar: avatarRef.current.value });
}

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar-link"
          name="avatar"
          placeholder="Avatar link"
          required
          type="url"
          ref={avatarRef}
        />
        <span className="popup__error" id="avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}