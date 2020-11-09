import { NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import { DebounceInput } from 'react-debounce-input';
import { SearchIputDate } from '../../components/SearchInputDate/SearchIputDate';
import { SuggestionsList } from '../../components/SuggestionsList/SuggestionsList';
import classes from './searchPage.module.scss';
import { getSuggestions, formatDate } from './helpers';

interface Suggestion {
  geoId: string,
  destinationId: string,
  landmarkCityDestinationId: string,
  type: string,
  caption: any,
  redirectPage: string,
  latitude: number,
  longitude: number,
  name: string,
}

interface Props {
  suggestions: Suggestion[]
}

const SearchPage: NextPage<Props> = () => {
  const router = useRouter();
  const [nearBy, setNearBy] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<Suggestion>();
  const [isVisibleSuggestions, setIsVisibleSuggestions] = useState(false);
  const [minDate, setMinDate] = useState(Date.now());
  const [maxDate, setMaxDate] = useState(Date.now() +  86400000);
  const [checkIn, setCheckIn] = useState(formatDate(minDate));
  const [checkOut, setCheckOut] = useState(formatDate(maxDate));
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
    } else {
      // getHotels(checkIn, checkOut, selectedPlace.latitude, selectedPlace.longitude);
      router.push({
        pathname: '/results',
        query: {
          checkIn,
          checkOut,
          lat: selectedPlace.latitude,
          lon: selectedPlace.longitude
        }
      })
      console.log(router.pathname)
    }
  }
 
  const handleSelect = (suggestion: Suggestion) => {
    setNearBy(suggestion.name);
    setSelectedPlace(suggestion);
    setIsVisibleSuggestions(false);
  }

    return (
      <div className={classes.page}>
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
              placeholder="Enter the destination or the name of the facility"
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
            <button className={classes.button} onClick={searchHotels}>search</button>
          </div>
        </div>
        <p>
          {
            isError && 'Some error'
          }
          {
            isLoading && 'Loading'
          }
        </p>
      </div>
    )
}



// export async function getServerSideProps(context) {

//   const suggestions = await getSuggestions(context.query.place);

//   return { 
//       props: {
//       suggestions 
//     }  
//   }
// }
  
export default SearchPage;