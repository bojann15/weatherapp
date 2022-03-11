import React, {useCallback, useEffect, useRef, useState, useContext} from "react";
import "./addCity.css";
import API from "../../api";
import { GlobalContext } from "../../context/globalState";

const  AddCity = ({ addCityModal, setAddCityModal }) => {
    const { cards, setCards} = useContext(GlobalContext);
    
    const [dropDown, setDropDown] = useState(false);
    
    const modalRef = useRef();
    
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setAddCityModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && addCityModal) {
            setAddCityModal(false);
          }
        },
        [addCityModal, setAddCityModal]
    );
    
    useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const [city, setCity] = useState('');

    const handleAddCity = async () => {
        if(city){
            const response = await API.get(`/data/2.5/weather?q=${city}`);
            setCards([...cards, response.data]);
            setAddCityModal(false);
          };
    };

    return (

        <div className="modal-city-background" onClick={closeModal} ref={modalRef}>
          <div className="modal-city-container">
            <div className="title-city-section-wrapper">
                <div className="title-city-section">
                    <h3 className="title-city">Add new city</h3>
                    <div className="title-city-CloseBtn">
                      <button onClick={() => { setAddCityModal(false)}}> X </button>
                    </div>
                </div>
            </div>
            
            <div className="dropdown-wrapper">
              <div className={dropDown ? "dropdown active" : "dropdown"} onClick={()=> setDropDown(!dropDown)}>
                  <label htmlFor='text'>NAME OF THE CITY</label>
                  <input type="text" className="textBox" id="text"  placeholder={city ? city : "Select City"} readOnly/>
                  <div className="option" style={{display: dropDown ? 'block' : 'none'}}>
                        <div onClick={() => setCity('Paris')}>Paris</div>
                        <div onClick={() => setCity('Riga')}>Riga</div>
                        <div onClick={() => setCity('Kiyev')}>Kiyev</div>
                        <div onClick={() => setCity('London')}>London</div>
                  </div>
              </div>
            </div>

            <div className="footer-wrapper">
                <div className="footer">
                    <button onClick={() => {setAddCityModal(false)}} id="cancelBtn">Cancel</button>
                    <button className="apply-button" onClick={() => handleAddCity()}>Add</button>
                </div>
            </div>
          </div>
        </div>
    );
};

export default AddCity;