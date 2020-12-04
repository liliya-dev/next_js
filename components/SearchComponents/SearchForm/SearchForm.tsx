import classes from './SearchForm.module.scss';
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner';
import { DebounceInput } from 'react-debounce-input';
import { SearchIputDate } from './SearchInputDate/SearchIputDate';
import { SuggestionsList } from './SuggestionsList/SuggestionsList';
import { getSuggestions, formatDate } from './helpers';
import { Counter } from '../../Counter/Counter';
import { CurrencyList } from '../../CurrencyList/CurrencyList';
import { Suggestion } from './interface';


interface Props {
}

export const SearchForm: React.FC<Props> = () => {
  const router = useRouter();
  const [nearBy, setNearBy] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Suggestion>();
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [minDate, setMinDate] = useState(Date.now());
  const [maxDate, setMaxDate] = useState(Date.now() +  86400000);
  const [checkIn, setCheckIn] = useState(formatDate(minDate));
  const [checkOut, setCheckOut] = useState(formatDate(maxDate));
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [roomsNumber, setRoomsNumber] = useState(1);
  const [currency, setCurrency] = useState('UAH');
  const [isCurrencyVisisble, setCurrencyVisisble] = useState(false);

  const changeRoomsNumber = (value: number) => {
    setRoomsNumber(value);
  }

  const changeCurrency = (value: string) => {
    setCurrency(value);
    setCurrencyVisisble(false);
  }

  useEffect(() => {
    const setList = async () => {
      setIsLoading(true);
      setIsError(false);
        const list = await getSuggestions(nearBy);

        if (list instanceof Error)  {
          setIsError(true);
          setIsLoading(false);
          return;
        }
      setIsLoading(false);
      setSuggestions(list);
      setSelectedPlace(list[0]); 
    }

    if (nearBy !== '') {
      setList();
    }
  }, [nearBy])
  
  const updateDate = (date: number, option: string) => {
    if (option === 'checkin') {
      setCheckIn(formatDate(date));
      if (date > maxDate - 86400000) {
        setMaxDate(date + 86400000);
      }
      setMinDate(date);
    } else {
      setCheckOut(formatDate(date));
      setMaxDate(date);
    }
  }

  const searchHotels = () => {
    if (nearBy === '') {
      return;
    } else {
      router.push({
        pathname: '/accomodations',
        query: {
          checkIn,
          checkOut,
          lat: selectedPlace.latitude,
          lon: selectedPlace.longitude,
          page: 1,
          rooms: roomsNumber,
          currency
        }
      })
    }
  }
 
  const handleSelect = (suggestion: Suggestion) => {
    setNearBy(suggestion.name);
    setSelectedPlace(suggestion);
    setIsVisibleSuggestions(false);
  }

  const childRef = useRef<any>();

  return (
    <>
      <div className={classes.currencyWrapper}>
        <button 
          type="button" 
          className={`${classes.currencyButton} fs-14`}
          onClick={() => setCurrencyVisisble(!isCurrencyVisisble)}
        >
          <p>{currency}</p>	
          <span className="fs-10">&#9660;</span>
        </button>
        {isCurrencyVisisble && <CurrencyList activeCurrency={currency} setCurrency={changeCurrency} />}
      </div>
      <div className={classes.container}>
        <div className={classes.inputWrapper}>
          <DebounceInput
            onChange={(ev) => {
              setNearBy(ev.target.value);
              setIsVisibleSuggestions(true);
            }}
            value={nearBy+''}
            debounceTimeout={1000}
            className={classes.input}
            placeholder="Enter the destination"
          />
          <SuggestionsList
            handleSelect={handleSelect} 
            suggestions={suggestions} 
            isVisible={isVisibleSuggestions}
            isError={isError}
            isLoading={isLoading}
          />
          <div className={classes.dateContainer}>
            <SearchIputDate 
              minDate={Date.now()}
              text="Check in date"
              updateDate={updateDate}
              option="checkin"
              selectedDate={new Date(minDate)}
            />
            <SearchIputDate 
              minDate={minDate + 86400000}
              text="Check out date"
              updateDate={updateDate}
              option="checkout"
              selectedDate={new Date(maxDate)}
            />
          </div>
          <div className={classes.dateContainer}>
            <Counter roomsNumber={roomsNumber} setRomsNumber={changeRoomsNumber} />
            <button className={classes.button} onClick={searchHotels} disabled={isLoading}>
              { isLoading ? 
              ( <div className={classes.loadingButton}>
                  Loading
                  <Loader
                    type="Audio"
                    color="white"
                    height={15}
                    width={15}
                    timeout={3000}
                    className={classes.spinner}
                  />
                </div> )
                : 'Search'
              }
            </button>
          </div>
        </div>
      </div>
      <p> { isError && 'Some error' } </p>
    </>
  )
}