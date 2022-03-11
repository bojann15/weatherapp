import React, {useCallback, useEffect, useRef, useContext, useState} from "react";
import "./filterModal.css";
import { GlobalContext } from "../../context/globalState";


const  FilterModal = ({ filterModal, setFilterModal }) => {
    const {cart, setCart, id, update, setUpdate} = useContext(GlobalContext);

    const [minMax, setMinMax] = useState(false);
    const [sunRise, setSunRise] = useState(false);
    const [wind, setWind] = useState(false);
    const [whatShow, setWhatShow] = useState({id:'', min:false, sun: false, wi:false});

    const modalRef = useRef();

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setFilterModal(false);
        };
    };

    const keyPress = useCallback(
        e => {
          if (e.key === 'Escape' && filterModal) {
            setFilterModal(false);
          }
        },
        [filterModal, setFilterModal]
    );
    
    useEffect(
        () => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );

    const applyFunction =() => {
      setCart([...cart, { ...whatShow, id: id, min: minMax, sun: sunRise, wi:wind }]);
      setMinMax(false);
      setSunRise(false);
      setWind(false);
      setFilterModal(false);
      setUpdate(!update);
    };


    const getValue = () => {
      let state ={
        min: '',
        sun: '',
        wi: '',
      }

      cart.forEach(car => {
        if(car.id === id) {
          state.min = car.min;
          state.sun = car.sun;
          state.wi = car.wi;
        }
      });

      return state;
    };


    return (
      <div className="modal-filter-background" onClick={closeModal} ref={modalRef}>
        <div className="modal-filter-container">
          <div className="title-filter-section-wrapper">
              <div className="title-filter-section">
                  <h3 className="title-filter">Select Fields to Display</h3>
                  <div className="title-filter-CloseBtn">
                    <button onClick={() => {setFilterModal(false)}}>X</button>
                  </div>
              </div>
          </div>
          
          <div className="input-wrapper">
            <div className="input-min-max">
                  <input type='checkbox' className="checkbox-custom" defaultChecked={getValue().min} value={true} id='min-max' onChange={(e) => setMinMax(e.target.checked) }/>
                  <label htmlFor='min-max'>Min / Max Temperature</label>
            </div>
            <div className="input-border"></div>
            <div className="input-sunrise-sunset">
                  <input type='checkbox' className="checkbox-custom" defaultChecked={getValue().sun} value={true} id='sunrise-sunset' onChange={(e) => setSunRise(e.target.checked)}/>
                  <label htmlFor='sunrise-sunset'>Sunrise / Sunset Time</label>
            </div>
            <div className="input-border"></div>
            <div className="input-wind">
                  <input type='checkbox' className="checkbox-custom" defaultChecked={getValue().wi} value={true} id='wind' onChange={(e) => setWind(e.target.checked)}/>
                  <label htmlFor='wind'>Wind</label>
            </div>
            <div className="input-border"></div>
          </div>
          
          <div className="footer-wrapper">
              <div className="footer">
                  <button onClick={() => {setFilterModal(false)}} id="cancelBtn">Cancel</button>
                  <button  className="apply-button" onClick={() => applyFunction()}>Apply</button>
              </div>
          </div>
        </div>
      </div>
    );
}

export default FilterModal;