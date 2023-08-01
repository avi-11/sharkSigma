import {useState} from 'react';

import styles from "./BasketInstrumentSearch.module.css";

const BasketInstrumentSearch = ({basketSearchValue, setBasketSearchValue, searchHandler, currentBasketData, searchData, addInstrumentToBasket, showInstrumentContainer, setShowInstrumentContainer, searchContainerRef}) => {
    const [searchContainerData, setSearchContainerData] = useState([]); // Stores the results of instrument search

    // Toggles the container that renders search results for the instrument
    // Gets toggled whenever changes are made to the input field. 
    const displayDataContainer = (e) => {
        setBasketSearchValue(e.target.value);

        setSearchContainerData(searchData.filter(item => (
            (((item[0].toLowerCase()).includes(basketSearchValue.toLowerCase())) || 
            ((item[1].toLowerCase()).includes(basketSearchValue.toLowerCase()))) &&
            (!(currentBasketData.includes(item[0].toUpperCase())))
        )));

        
        if(basketSearchValue!=="") setShowInstrumentContainer(true);
        else setShowInstrumentContainer(false);
    }

    

    return (
        <div className={styles.basketInstrumentSearch} ref={searchContainerRef}>
            <input id="add_instrument" type="text" placeholder="Search the Instrument, stock, mutual funds" value={basketSearchValue} onChange={(e) => {displayDataContainer(e)}} />

            <div className={styles.basketInstrumentSearch__dataContainer} style={{display: `${showInstrumentContainer ? '' : 'none'}`}}>
                <div>
                    <h5>Search Results</h5>
                    <span onClick={(e) => setShowInstrumentContainer(false)}>X</span>
                </div>
                

                <hr />
                {searchContainerData.length>0 ? searchContainerData.map(item => <div>
                        <label>{item[0]}</label>

                        <p>{item[1]}</p>

                        <div>
                            <button onClick={() => addInstrumentToBasket(item)}>+ Add</button>
                        </div>
                    </div>
                ) : <div>Search Data not present</div>}
            </div>
        </div>
    )
}

export default BasketInstrumentSearch;