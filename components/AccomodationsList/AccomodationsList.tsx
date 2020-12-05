import { searchResult } from './interface';
import { AccomodationItem } from './AccomadationItem/AccomodationItem';
import classes from './AccomodationList.module.scss';
import Loader from 'react-loader-spinner'
import { SearchButton } from '../SearchButton/SearchButton';
import { SortOrder } from './SortOrder/SortOrder';

interface Props {
  hotels: searchResult[],
  isLoaded: boolean,
  loadMore: () => void,
  nextPage: number | string,
  isLoading: boolean,
  setIsLoading: () => void
}

export const AccomodationsList: React.FC<Props> = ({ 
  hotels, isLoaded, loadMore, nextPage, isLoading, setIsLoading 
}) => {
  return (
    <div className={classes.container}>
      <SortOrder setIsLoading={setIsLoading}/>
      {
        isLoading && (
          <Loader
            type="Audio"
            color="rgba(17, 18, 54, 0.8)"
            height={150}
            width={150}
            timeout={3000}
            className={classes.spinner}
          />
        )
      }
      <ul className={classes.list}>
        {(!hotels.length && isLoaded) && <p>No results</p>}
        {
          (hotels && hotels.length > 0) && (
            hotels.map((hotel, index) => (
              <AccomodationItem 
                setIsLoading={setIsLoading} 
                hotel={hotel} 
                key={hotel.supplierHotelId + index} 
              />
            ))
          )
        }
      </ul>
      {
        (nextPage !== 1 && hotels.length > 0)  &&  (
          <SearchButton isLoading={isLoading} handleClick={loadMore} title='more results' />
        )
      }
    </div>
  )
}