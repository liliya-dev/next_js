import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import classes from './SearchInputWithList.module.scss';

export const SearchInputWithList = ({ 
  place, updatePlace, placesList, updateCityId, text, additionalStyle={}
}) => {
  const [isVisibleplacesList, setIsVisiblePlacesList] = useState(false);

  return (
    <div className={classes.containerInput}>
      <p className={classes.text}>{text}</p>
      <DebounceInput
        style={additionalStyle}
        minLength={2}
        debounceTimeout={1000}
        value={place}
        className={classes.input}
        onChange={event => {
          updatePlace(event.target.value);
          setIsVisiblePlacesList(true);
        }} 
        onBlur={(ev) => console.log(ev)}
      />
      {
        isVisibleplacesList && (
          <ul className={classes.list}>
          {
            placesList && placesList.Places && placesList.Places.map(place => {
              return (
                <li
                  className={classes.listItem}
                  key={place.PlaceId + place.PlaceName}
                  onClick={() => {
                    updateCityId(place.CityId);
                    updatePlace(place.PlaceName);
                    setIsVisiblePlacesList(false)
                  }}
                >
                  {place.PlaceName} ({place.PlaceId})
                </li>
              )
            })
          }
        </ul>
        )
      }
      
    </div>
  )
}