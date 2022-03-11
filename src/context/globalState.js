import React, { useState, createContext } from 'react';

export const GlobalContext = createContext();
export const GlobalContextProvider = (props) => {
   
    const [id, setId] = useState('');
    const [cart, setCart] = useState([]);
    const [update, setUpdate] = useState(false);
    const [cards, setCards] = useState([]); 


    return (
        <GlobalContext.Provider value={{id, setId,cart, setCart, update, setUpdate, cards, setCards}}>
            {props.children}
        </GlobalContext.Provider >
    )
}