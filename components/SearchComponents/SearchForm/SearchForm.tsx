import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Suggestion } from './interface';
import { DebounceInput } from 'react-debounce-input';
import classes from './SearchForm.module.scss';
import { getSuggestions, formatDate, getInitialValue } from './helpers';
import { SearchIputDate } from '../SearchInputDate/SearchIputDate';
import { SuggestionsList } from '../SuggestionsList/SuggestionsList';
import { Counter } from '../Counter/Counter';
import { CurrencyList } from '../CurrencyList/CurrencyList';
import { SearchButton } from '../SearchButton/SearchButton';

interface Props {
  isLoadingFromParent?: boolean
}

const DAY_IN_SECONDS = 86400000;

export const SearchForm: React.FC<Props> = ({ isLoadingFromParent }) => {
  const router = useRouter();
  const { 
    initialMaxDate, initialMinDate, initialNearBy, initialCurrency, initialRooms, lat, lon 
  } = getInitialValue(router);
  const [nearBy, setNearBy] = useState(initialNearBy);
  const [selectedPlace, setSelectedPlace] = useState<Suggestion>();
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [minDate, setMinDate] = useState(initialMinDate);
  const [maxDate, setMaxDate] = useState(initialMaxDate);
  const [checkIn, setCheckIn] = useState(formatDate(minDate));
  const [checkOut, setCheckOut] = useState(formatDate(maxDate));
  const [isLoading, setIsLoading] = useState(isLoadingFromParent || false);
  const [isError, setIsError] = useState(false);
  const [roomsNumber, setRoomsNumber] = useState(+initialRooms);
  const [currency, setCurrency] = useState(initialCurrency);
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
      if (date > maxDate - DAY_IN_SECONDS) {
        setMaxDate(date + DAY_IN_SECONDS);
      }
      setMinDate(date);
    } else {
      setCheckOut(formatDate(date));
      setMaxDate(date);
    }
  }

  const searchHotels = () => {
    if (router.pathname !== '/accomodations') {
      setIsLoading(true);
    }
    if (nearBy === '') {
      return;
    } else {
      router.push({
        pathname: '/accomodations',
        query: {
          checkIn,
          checkOut,
          lat: selectedPlace.latitude || lat,
          lon: selectedPlace.longitude || lon,
          page: 1,
          rooms: roomsNumber,
          currency,
          nearBy
        }
      })
    }
  }
 
  const handleSelect = (suggestion: Suggestion) => {
    setNearBy(suggestion.name);
    setSelectedPlace(suggestion);
    setIsVisibleSuggestions(false);
  }

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
              minDate={minDate + DAY_IN_SECONDS}
              text="Check out date"
              updateDate={updateDate}
              option="checkout"
              selectedDate={new Date(maxDate)}
            />
          </div>
          <div className={classes.dateContainer}>
            <Counter roomsNumber={roomsNumber} setRomsNumber={changeRoomsNumber} />
            <SearchButton 
              isLoading={isLoading} 
              isLoadingFromParent={isLoadingFromParent} 
              handleClick={searchHotels} 
              title='search' 
            />
          </div>
        </div>
      </div>
      <p className="fs-16-italic-bold"> { isError && 'Some error' } </p>
    </>
  )
}