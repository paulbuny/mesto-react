import {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup"
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

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

    const [currentUser, setCurrentUser ] = useState({
        name: '',
        about: '',
        avatar: '',
    });

    useEffect(() => {
        api.getUserInformation()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(console.error);
    }, [])


    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
            .then((cards) => setCards(cards));
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(console.error);
    }

    function handleDeleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((res) => res !== card))
            })
            .catch(console.error);
    }


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

    function handleUpdateUser(data) {
        api.saveUserInformation({name: data.name, about: data.about})
            .then((res) => setCurrentUser(res))
            .catch(console.error)
            .finally(() => closeAllPopups());
    }

    function handleUpdateAvatar(data) {
        console.log(data);
        api.changeUserAvatar(data.avatar)
            .then((res) => setCurrentUser(res))
            .catch(console.error)
            .finally(() => closeAllPopups())
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard({name: data.name, link: data.link})
            .then((newCard) => setCards([newCard, ...cards]))
            .catch(console.error)
            .finally(()=>closeAllPopups())
    }

    return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
        />
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

        <ImagePopup isOpen={selectedCard.isOpen} name={selectedCard.name} link={selectedCard.link} onClose={closeAllPopups}/>
        </div>
    </CurrentUserContext.Provider>
  );

}

export default App;
