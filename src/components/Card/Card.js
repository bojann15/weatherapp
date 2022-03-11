import React, {useContext, useEffect} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GlobalContext } from "../../context/globalState";

const Card = ({card, setFilterModal, handleDelete, index}) => {
    const { id, setId,  cart, setCart, update,  cards} = useContext(GlobalContext);

    const convertTime = (unixTime, offset) => {
        const dt = new Date((unixTime + offset) * 1000);
        const h = dt.getHours();
        const m = "0" + dt.getMinutes();
        const t = h + ":" + m.substr(-2);
        return t;
    };   


    const sRise = convertTime(card.sys.sunrise, card.timezone ? card.timezone : card.sys.timezone);
    const sSet = convertTime(card.sys.sunset, card.timezone ? card.timezone :  card.sys.timezone);
    
  
    const filterCart = () => {
        for(let i=cart.length-1; i>=0; i--){
            for(let j=i-1; j>=0; j--) {
                if(cart.length>1 && cart[i]?.id === cart[j]?.id) cart.splice(j, 1)
            }
          };
        setCart([...cart]);
    };

    useEffect(() => {
    
        filterCart();

        cards.forEach((card, ix) => {
            if(card.id === id){
                if(index === ix){
                    cart.forEach(car => {
                        if(car.id === card.id){
                            if(car.min && car.sun && car.wi){
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'flex';
                            } else if(car.min && car.sun) {
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'none';
                            } else if(car.min && car.wi) {
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'flex';
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'none';
                            } else if(car.sun && car.wi) {
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'flex';
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'none';
                            }
                            else if(car.min) {
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'block'
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'none';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'none';
                            } else if(car.sun) {
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'block';
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'none';
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'none';
                            } else if(car.wi) {
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'flex';
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'none';
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'none';
                            } else{
                                document.querySelector(`#card-${index}`).querySelector('.card-wind').style.display = 'none';
                                document.querySelector(`#card-${index}`).querySelector('.card-min-max').style.display = 'none';
                                document.querySelector(`#card-${index}`).querySelector('.card-sunset-sunrise').style.display = 'none';
                            }
                        }
                    })
                }
            }})
    }, [update]);
    
    return(
        <Draggable key={`draggeble-${index}`} draggableId={`draggeble-${index}`} index={index}>
        {(provided) => (
        <div className="card" id={`card-${index}`} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
            <div className="filter-delete">
                <div className="filter-icon">
                    <i className='fas fa-bars'  onClick={() => {
                        setFilterModal(true);
                        setId(card.id);
                        }}>
                    </i>
                </div>
                <div className="delete-icon">
                    <i className="fa-solid fa-trash-can" onClick={() => handleDelete(card.id)}></i>
                </div>
            </div>
            <span className='card-city'>{card.name}</span>
            <span className='card-temp'>{Math.trunc(card.main.temp)}°C</span>
            <div className='weather-icon'>
                <img src={`http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`} alt="" />
            </div>
            <span className='card-weather-description'>{card.weather[0].main}</span>
            <div className='card-expand'>
                <div className='card-min-max' style={{display: 'none'}}>
                    <div className='card-min'>
                        <span className='min-temperature'>Min Temperature:</span>
                        <span className='min-temperature-value'>{Math.trunc(card.main.temp_min)}°C</span>
                    </div>
                    <div className='card-max'>
                        <span className='max-temperature'>Max Temperature:</span>
                        <span className='max-temperature-value'>{Math.trunc(card.main.temp_max)}°C</span>
                    </div>
                </div>
                <div className='card-sunset-sunrise' style={{display: 'none'}}>
                    <div className='card-sunset'>
                        <span className='sunset'>Sunset:</span>
                        <span className='sunset-value'>{sSet}pm</span>
                    </div>
                    <div className='card-sunrise'>
                        <span className='sunrise'>Sunrise:</span>
                        <span className='sunrise-value'>{sRise}am</span>
                    </div>
                </div>
                <div className='card-wind' style={{display: 'none'}}>
                    <span className='wind'>Wind:</span>
                    <span className='wind-value'>{card.wind.speed}ms</span>
                </div>
            </div>
            {provided.placeholder}
        </div>
        )}
        </Draggable>
    )
}
export default Card;
