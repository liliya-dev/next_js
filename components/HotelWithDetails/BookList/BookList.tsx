import { BookItem } from './BookItem/BookItem';
import classes from './BookList.module.scss';

interface Props {
    rooms: {
      additionalInfo: {
        description: string,
        details: {
          amenities: string[]
        }
      },
      bedChoices: {
        mainOptions: string[]
      },
      images: {
        caption: string,
        fullSizeUrl: string,
        thumbnailUrl: string
      }[],
      maxOccupancy: {
        children: number,
        messageChildren: string,
        messageTotal: string,
        total: number
      }, 
      name: string,
      ratePlans: {
        cancellation: {
          additionalInfo: string,
          cancellationDate: string,
          free: boolean,
          info: string,
          refaundable: boolean,
          title: string
        },
        features: {
          featureType: string,
          title: string
        }[],
        occupancy: {
          maxAdults: number,
          maxChildren: number
        },
        offers: {
          offer: {
            promoType: string,
            text: string
          },
          valueAdds: []
        },
        price: {
          current: string, 
          old: string,
          unformattedCurrent: number,
          priceBreakdown: {
            lineItems: {
              label: string,
              price: string
            }[],
            total: {
              label: string,
              price: string
            }
          }
        },
        welcomeRewards: {
          info: string
        }
      }[]
    }[]
  }


export const BookList: React.FC<Props> = ({ rooms }) => {


  return (
    <div>
      <ul className={classes.headersList}>
        <li>Room name</li>
        <li>Photos</li>
        <li>Options</li>
        <li>Today's price</li>
      </ul>
      <ul>
        {
          rooms && rooms.map(room => <BookItem key={room.name}room={room} />)
        }
      </ul>
    </div>
  )
}