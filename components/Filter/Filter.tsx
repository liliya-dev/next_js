import classes from "./Filter.module.scss";
import { DebounceInput } from 'react-debounce-input';
import filter from './filter.png';
import { hopsList, maltsList } from './constants';
import { Select } from '../Select/Select';
import { useState } from "react";

interface Props {
    beerName: string;
    foodPairing: string
    setParams: (value: string, option: string) => (void);
}

export const Filter: React.FC<Props> = ({ beerName, foodPairing, setParams }) => {
    const [hops, setHops] = useState<string[]>([]);
    const [malt, setMalt] = useState<string[]>([]);

    const handleChangeSelectedList = (value: string, option: string, action: string) => {
        let params;
        switch (option) {
            case 'hops':
                let updatedHops;
                if (action === 'add') {
                    updatedHops = (hops.includes(value)) ? hops :[...hops, value];
                } else {
                    updatedHops = hops.filter(option => option !== value);
                }
                setHops(updatedHops);
                params = updatedHops.map(hop => hop.split(' ').join('_')).join('|')
                break;

            case 'malt':
                let updatedMalt;
                if (action === 'add') {
                    updatedMalt = malt.includes(value) ? malt :[...hops, value];
                } else {
                    updatedMalt = hops.filter(option => option !== value);
                }
                setMalt(updatedHops);
                params = updatedMalt.map(malt => malt.split(' ').join('_')).join('|')
                break;
        }
        setParams(params, option);
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <img src={filter} alt=""/>
                <button 
                    type="button"
                    className={classes.buttonClear}
                >
                    <h5>Clear all filters</h5>
                </button>
            </div>
            <DebounceInput
                minLength={2}
                debounceTimeout={2000}
                value={beerName}
                onChange={(event) => setParams(event.target.value, 'beerName')}
                className={classes.input}
                type="text"
                placeholder="Enter the beer name"
            />
            <DebounceInput
                minLength={2}
                debounceTimeout={2000}
                value={foodPairing}
                onChange={(event) => setParams(event.target.value, 'foodPairing')}
                className={classes.input}
                type="text"
                placeholder="Enter the dish"
            />
            <div className={classes.slidecontainer}>
                <h5 className={classes.title}>Rating</h5>
                <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    onChange={(ev) => console.log(ev.target.value)}
                    className={classes.slider} 
                    id="myRange" 
                />
            </div>
            <Select 
                selectedList={hops}
                currentOption="select"
                optionsList={hopsList} 
                optionName="hops"
                handleChangeSelectedList={handleChangeSelectedList} 
            />
            <Select 
                selectedList={malt}
                currentOption="select" 
                optionsList={maltsList} 
                optionName="malt" 
                handleChangeSelectedList={handleChangeSelectedList} 
            />
        </div>
    )
}