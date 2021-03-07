import {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    //Стейт переменная Поп-апа Аватара
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    //Стейт переменная Поп-апа редактирования Профиля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    //Стейт переменная Поп-апа добавления нового места
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    //Стейт переменная заголовка Поп-апа
    const [popupTitle, setPopupTitle] = useState('');
    //Стейт переменная названия Поп-апа
    const [popupName, setPopupName] = useState('');
    //Стейт переменная внутреннего содержания поп-апа
    const [popupChildren, setPopupChildren] = useState([]);
    //Стейт переменная карточки по клику
    const [selectedCard, setSelectedCard] = useState({
        isOpen: false,
        name: '',
        link: '',
    });

    //Функция обработчика клика по кнопке редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);

        setPopupTitle('Обновить аватар');
        setPopupName('edit-avatar');
        setPopupChildren((
            <>
                <input className="popup__input popup__input_profile_avatar" type="url" name="avatar" id="profile-avatar"
                       minLength="2" required/>
                <span className="popup__input-error profile-avatar-error"/>
                <button className="button popup__submit" type="submit">Сохранить</button>
            </>
        ));
    }

    //Функция обработчика клика по кнопке редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);

        setPopupTitle('Редактировать профиль');
        setPopupName('edit-profile');
        setPopupChildren((
            <>
                <input className="popup__input popup__input_profile_name" type="text" name="name" id="profile-name"
                       minLength="2" maxLength="40" required />
                <span className="popup__input-error profile-name-error"/>
                <input className="popup__input popup__input_profile_job" type="text" name="about" id="profile-text"
                       minLength="2" maxLength="200" required />
                <span className="popup__input-error profile-text-error"/>
                <button className="button popup__submit" type="submit">Сохранить</button>
            </>
        ));
    }

    //Функция обработчика клика по кнопке добавления нового места
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);

        setPopupTitle('Новое место');
        setPopupName('add-place');
        setPopupChildren((
            <>
                <input className="popup__input popup__input_card_place" type="text" name="name" id="card-title"
                       placeholder="Название" minLength="2" maxLength="30" required/>
                <span className="popup__input-error card-title-error"/>
                <input className="popup__input popup__input_card_image" type="url" name="link" id="card-image"
                       placeholder="Ссылка на картинку" required/>
                <span className="popup__input-error card-image-error"/>
                <button className="button popup__submit" type="submit">Создать</button>
            </>
        ));
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

      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm title={popupTitle}
                       name={popupName}
                       children={popupChildren}
                       isOpen={isEditAvatarPopupOpen}
                       onClose={closeAllPopups}
        />
        <PopupWithForm title={popupTitle}
                        name={popupName}
                        children={popupChildren}
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
         />
        <PopupWithForm title={popupTitle}
                     name={popupName}
                     children={popupChildren}
                     isOpen={isAddPlacePopupOpen}
                     onClose={closeAllPopups}
        />
        <ImagePopup isOpen={selectedCard.isOpen} name={selectedCard.name} link={selectedCard.link} onClose={closeAllPopups}/>
        </div>
  );

}

export default App;
