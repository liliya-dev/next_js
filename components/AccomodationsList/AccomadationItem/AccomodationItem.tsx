import Link from 'next/link'
import { useRouter } from 'next/router';
import classes from './AccomodationItem.module.scss';
import { searchResult } from '../interface';
import { formatAddress } from './helpers';
import { Reviews } from './Reviews/Reviews';
import { PriceContainer } from './PriceContainer/PriceContainer';

interface Props {
  hotel: searchResult,
  setIsLoading: () => void
}

export const AccomodationItem: React.FC<Props> = ({ hotel, setIsLoading }) => {
  const router = useRouter();
  const { checkIn, checkOut, currency, rooms } = router.query;

  return (
      <Link 
        href={`/accomodations/${encodeURIComponent(hotel.id)}?checkIn=${checkIn}&checkOut=${checkOut}&currency=${currency}&rooms=${rooms}`
      }>
        <li className={classes.container} onClick={setIsLoading}>
            <p className={`${classes.title} fs-14-bold`}>{hotel.name}</p>
            <p className={`${classes.address} fs-14`}>{formatAddress(hotel.address)}</p>
          <div className={classes.wrapper}>
            <img 
              src={hotel.thumbnailUrl} 
              alt={hotel.name} 
              className={classes.image}
            />
            <div className={classes.info}>
              { 
                hotel.guestReviews ? (
                  <Reviews 
                    unformattedRating={hotel.guestReviews.unformattedRating}
                    scale={hotel.guestReviews.scale}
                    badgeText={hotel.guestReviews.badgeText}
                    total={hotel.guestReviews.total}
                  />
                )
                : <p className="fs-14-italic">No reviews yet</p>
              }
            </div>
            { hotel.ratePlan && <PriceContainer ratePlan={hotel.ratePlan}/> }
          </div>
        </li>
      </Link>
  )
}