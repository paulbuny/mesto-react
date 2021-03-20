import {useState, useEffect ,useContext} from 'react';
import Card from "./Card";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

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
        console.log('####: card - deleted!');
        api.deleteCard(card._id)
            .then((newCard) => {
                console.log(newCard);
                setCards((state) => state.filter((res) => res.owner._id !== currentUser._id))
            })
            .catch(console.error);
    }

    return (

        <main className="content">

            <section className="profile">
                <div className="profile__avatar-wrapper" style={{backgroundImage: `url(${currentUser.avatar})`}} >
                    <button className="button profile__edit-image" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__wrapper">
                    <div className="profile__info">
                        <h1 className="profile__info-title">{currentUser.name}</h1>
                        <p className="profile__info-text">{currentUser.about}</p>
                    </div>
                    <button className="button profile__edit" type="button" onClick={props.onEditProfile}/>
                </div>
                <button className="button profile__add" type="button" onClick={props.onAddPlace}/>
            </section>

            <section>
                <ul className="cards">
                    {
                        cards.map(item => <Card
                            key={item._id}
                            name={item.name}
                            link={item.link}
                            likes={item.likes}
                            id={item._id}
                            onCardClick={props.onCardClick}
                            card={item}
                            onCardLike={handleCardLike}
                            onCardDelete={handleDeleteCard}
                        />)
                    }
                </ul>
            </section>
        </main>

    )
}

export default Main;