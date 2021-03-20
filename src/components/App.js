import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";

function App() {
    //Стейт переменная Поп-апа Аватара
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    //Стейт переменная Поп-апа редактирования Профиля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    //Стейт переменная Поп-апа добавления нового места
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    //Стейт переменная карточки по клику
    const [selectedCard, setSelectedCard] = useState({
        isOpen: false,
        name: '',
        link: '',
    });

    const [currentUser, setCurrentUser ] = useState({});

    useEffect(() => {
        api.getUserInformation()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(console.error);
    }, [])

    //Функция обработчика клика по кнопке редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    //Функция обработчика клика по кнопке редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    //Функция обработчика клика по кнопке добавления нового места
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    //Функция обработчика клика по изображению в карточке
    function handleCardClick(props) {
        setSelectedCard({
            isOpen: true,
            link: props.link,
            name: props.name,
        });
    }

    //Функция обработчика клика по кнопке закрытия поп-апа
    function closeAllPopups() {

        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen: false});
    }


    return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm title={'Обновить аватар'}
                       name={'edit-avatar'}
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}>
            <input className="popup__input popup__input_profile_avatar" type="url" name="avatar" id="profile-avatar" minLength="2" required/>
            <span className="popup__input-error profile-avatar-error"/>
            <button className="button popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>

        <PopupWithForm title={'Редактировать профиль'}
                        name={'edit-profile'}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}>
            <input className="popup__input popup__input_profile_name" type="text" name="name" id="profile-name"
                   minLength="2" maxLength="40" required />
            <span className="popup__input-error profile-name-error"/>
            <input className="popup__input popup__input_profile_job" type="text" name="about" id="profile-text"
                   minLength="2" maxLength="200" required />
            <span className="popup__input-error profile-text-error"/>
            <button className="button popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>

        <PopupWithForm title={'Новое место'}
                     name={'add-place'}
                     isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}>
            <input className="popup__input popup__input_card_place" type="text" name="name" id="card-title"
                   placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__input-error card-title-error"/>
            <input className="popup__input popup__input_card_image" type="url" name="link" id="card-image"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error card-image-error"/>
            <button className="button popup__submit" type="submit">Создать</button>
        </PopupWithForm>

        <ImagePopup isOpen={selectedCard.isOpen} name={selectedCard.name} link={selectedCard.link} onClose={closeAllPopups}/>
        </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
