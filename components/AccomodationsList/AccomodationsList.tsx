import { searchResult } from './interface';
import { AccomodationItem } from './AccomadationItem/AccomodationItem';
import classes from './AccomodationList.module.scss';
import Loader from 'react-loader-spinner'

interface Props {
  hotels: searchResult[]
}

export const AccomodationsList: React.FC<Props> = ({ hotels }) => {
  return (
    <div>
      <p>list</p>
      <ul 
        className={classes.container}
        onScroll={(ev) => console.log(ev)}
      >
        {
          (hotels && hotels.length > 0) && (
            hotels.map(hotel => (
              <AccomodationItem hotel={hotel} key={hotel.supplierHotelId} />
            ))
          )
        }
        {
          (hotels && hotels.length === 0) && (
            <Loader
              type="Audio"
              color="rgba(17, 18, 54, 0.8)"
              height={100}
              width={100}
              timeout={3000}
              className={classes.spinner}
            />
          )
        }
      </ul>
    </div>
  )
}