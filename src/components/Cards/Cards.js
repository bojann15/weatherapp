import React, {useEffect, useState, useContext} from "react";
import API from "../../api";
import AddCity from "../AddCity/AddCity";
import Card from '../Card/Card';
import FilterModal from "../FilterModal/FilterModal";
import { GlobalContext } from "../../context/globalState";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const Cards = () => {

    const [search, setSearch] = useState('');
    const {cards, setCards, setUpdate, update} = useContext(GlobalContext);
    const [filterModal, setFilterModal] = useState(false);
    const [addCityModal, setAddCityModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                    const response = await API.get(`/data/2.5/group?id=2761369,792680,292223,108410&units=metric`);
                    setCards(response.data.list);
            } catch (err) {
                console.error(err)
            }
        };
        fetchData();

    }, [setCards]);
    
    const handleDelete = (id) => {
        cards.forEach((item, index) => { if (item.id === id) cards.splice(index, 1)});
        setCards([...cards]);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if(search.length !== 0 && search !== ''){
            const response = await API.get(`/data/2.5/weather?q=${search}`);
            setCards([response.data]);
        };
        setSearch(''); 
    };

    const handleOnDragEnd = (result) => {
        if(!result.destination) return;
        const items = [...cards];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem)
        setCards(items);
        setUpdate(!update)
        
    }

    return(
        <div className="wrapper">
            <div className="title-wrapper">
                <div className="title">
                    <h1>Umbrela Forecast</h1>
                </div>
                <div className="search-wrapper">
                    <div className="search"> 
                        <form onSubmit={handleSearch}>
                            <button type="submit" className="search-button"></button><i className="fas fa-search"></i>
                            <input className="search-input" type="text" value={search} placeholder="Search new city" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
                        </form>
                    </div>
                    <div className="add-wrapper">
                        <i className="fa-solid fa-plus" onClick={() => setAddCityModal(true)}></i> 
                        <span className="add">Add New</span>
                    </div>
                </div>
            </div>
            <div className="border"></div>
            <div className="cards-section">
                <div className="cards-section-title">
                        <h3>Weather in Europe</h3>
                </div> 
                {filterModal && <FilterModal filterModal={filterModal} setFilterModal={setFilterModal} />}
                {addCityModal && <AddCity addCityModal={addCityModal} setAddCityModal={setAddCityModal} />}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="cards" direction= "horizontal" type='column' >
                        {(provided) => (
                <div className="cards-wrapper" {...provided.droppableProps} ref={provided.innerRef}>
                {
                    cards?.map((card, index) => {
                        return <Card key={card.id} card={card} index={index} setFilterModal={setFilterModal} handleDelete={handleDelete}/>
                    })
                }
                {provided.placeholder}
                </div>  
                )}
                </Droppable>
                </DragDropContext>
            </div>
            
        </div>
    )
}
export default Cards;