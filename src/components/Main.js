import api from '../utils/api';
import {useState, useEffect} from 'react';
import Card from "./Card";

function Main(props) {
    //Стейт переменная имени пользователя
    const [userName, setUserName] = useState('Загрузка...');
    //Стейт переменная описания пользователя
    const [userDescription, setUserDescription] = useState('Загрузка...');
    //Стейт перменная пользовательского аватара
    const [userAvatar, setUserAvatar] = useState();
    //Стейт переменная массива карточек
    const [cards, setCards] = useState([]);

    //Получение данных о пользователе от сервера
    useEffect(() => {

        api.getUserInformation()
            .then((data) => {
                setUserAvatar(data.avatar);
                setUserDescription(data.about);
                setUserName(data.name);
            })
            .catch(console.error);
    }, []);

    //Получение массива карточек от сервера
    useEffect(()=> {

        api.getInitialCards()
            .then((data) => setCards(data))
            .catch(console.error);
            }, []);

    return (

        <main className="content">

            <section className="profile">
                <div className="profile__avatar-wrapper" style={{backgroundImage: `url(${userAvatar})`}} >
                    <button className="button profile__edit-image" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__wrapper">
                    <div className="profile__info">
                        <h1 className="profile__info-title">{userName}</h1>
                        <p className="profile__info-text">{userDescription}</p>
                    </div>
                    <button className="button profile__edit" type="button" onClick={props.onEditProfile}/>
                </div>
                <button className="button profile__add" type="button" onClick={props.onAddPlace}/>
            </section>

            <section>
                <ul className="cards">
                    {
                        cards.map(item => <Card key={item._id} name={item.name} link={item.link} likes={item.likes} id={item._id} onCardClick={props.onCardClick} card={item}/>)
                    }
                </ul>
            </section>
        </main>

    )
}

export default Main;