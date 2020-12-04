import { searchResult } from './interface';
import { AccomodationItem } from './AccomadationItem/AccomodationItem';
import classes from './AccomodationList.module.scss';
import Loader from 'react-loader-spinner'

interface Props {
  hotels: searchResult[],
  isLoaded: boolean,
  loadMore: () => void,
  nextPage: number | string,
  isLoading: boolean
}

export const AccomodationsList: React.FC<Props> = ({ hotels, isLoaded, loadMore, nextPage, isLoading }) => {
  return (
    <div className={classes.container}>
      {
        (hotels && hotels.length === 0 && !isLoaded) && (
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
      <ul 
        className={classes.list}
      >
        {(!hotels.length && isLoaded) && <p>No results</p>}
        {
          (hotels && hotels.length > 0) && (
            hotels.map((hotel, index) => (
              <AccomodationItem hotel={hotel} key={hotel.supplierHotelId + index} />
            ))
          )
        }
      </ul>
      {
        (nextPage !== 1 && hotels.length > 0)  &&  (
          <button 
            type="button"
            className={classes.loadButton} 
            onClick={loadMore}
          >
            {
              isLoading ? (
                <Loader
                  type="Audio"
                  color="white"
                  height={20}
                  width={20}
                  timeout={3000}
                  className={classes.buttonSpinner}
                />
              ) : ' more results'
            }
           
          </button>
        )
      }
    </div>
  )
}