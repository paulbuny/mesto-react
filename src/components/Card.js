function Card(props) {

    //Коллбэк функция по клику на изображение карточки
    function handleClick() {
        props.onCardClick(props.card);
    }

    return(
        <div className="card-template">
            <li className="card" key={props.id}>
                <button className="button card__delete" type="button"/>
                <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
                <div className="card__text">
                    <h2 className="card__title">{props.name}</h2>
                    <div className="card__like-wrapper">
                        <button className="button card__like" type="button"/>
                        <span className="card__like-counter">{props.likes.length}</span>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default Card;