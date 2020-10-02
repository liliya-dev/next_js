import classes from "./Filter.module.scss";
import { DebounceInput } from 'react-debounce-input';
import filter from './filter.png';
import { hopsList, maltsList } from './constants';
import { Select } from '../Select/Select';
import { useState } from "react";
import { useRouter } from "next/router";
import { convertToString } from "../../helpers/convertToString";

interface Props {
    beerName: string;
    foodPairing: string
    setParams: (value: string, option: string) => (void);
}

const convertQueryToString = (query: string) => {
    if (query) {
        const queryList = query.split('|');
        const preparedList = queryList.map(item => item.split('_').join(' '));
        return preparedList;
    }
    return [];
}

export const Filter: React.FC<Props> = ({ beerName, foodPairing, setParams }) => {
    const router = useRouter();
    const [hops, setHops] = useState<string[]>(convertQueryToString(convertToString(router.query.hops)));
    const [malt, setMalt] = useState<string[]>(convertQueryToString(convertToString(router.query.malt)));
    const [rating, setRating] = useState('2')

    const handleChangeSelectedList = (value: string, option: string, action: string) => {
        let params;
        switch (option) {
            case 'hops':
                const updatedHops = (action === 'add')
                    ? (hops.includes(value)) ? hops :[...hops, value]
                    : hops.filter(option => option !== value);
                setHops(updatedHops);
                params = updatedHops.map(hop => hop.split(' ').join('_')).join('|');
                break;

            case 'malt':
                const updatedMalt = (action === 'add')
                    ? malt.includes(value) ? malt :[...hops, value]
                    : hops.filter(option => option !== value);
                setMalt(updatedHops);
                params = updatedMalt.map(malt => malt.split(' ').join('_')).join('|');
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
                <h5 className={classes.title}>Rating over {rating}</h5>
                <DebounceInput
                    debounceTimeout={0}
                    min="0" 
                    max="5" 
                    value="4"
                    step="0.1"
                    onChange={(ev) => setRating(ev.target.value)}
                    className={classes.slider} 
                    type="range"
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