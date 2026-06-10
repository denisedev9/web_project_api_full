import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext"; 
export default function EditProfile(){

  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  
  function handleSubmit(e) {
  e.preventDefault();
   handleUpdateUser({ name, about });
}
  
  return (
    <form
      className="popup__form"
      name="profile-form"
      id="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="profile-name"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Name"
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="popup__error" id="profile-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="profile-about"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="About me"
          required
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <span className="popup__error" id="profile-about-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Guardar
      </button>
    </form>
  );
}