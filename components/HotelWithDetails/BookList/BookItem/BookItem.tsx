import { useState } from 'react';
import classes from './BookItem.module.scss';
import { BookitemDetails } from './BookitemDetails/BookitemDetails';

interface Props {
  room: {
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
  }
}

export const BookItem: React.FC<Props> = ({ room }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const closeDetails = () => {
    setIsDetailVisible(false);
  }
  return (
   <div className={classes.container}>
     {
       isDetailVisible && <BookitemDetails closeDetails={closeDetails} room={room} />
     }
     <div>
      <h5 className={classes.title}>{room.name}</h5>
     </div>
     <div className={classes.photos}>
       <img 
        onClick={() => setIsDetailVisible(true)}
        src={room.images[0].thumbnailUrl} 
        alt={room.name}
      />
     </div>
     <div className={classes.cancellationAndFeatures}>
       <ul>
         {
           room.ratePlans[0].features.map(feature => (
            <li key={feature.title}><span className={classes.cancellationIcon} style={{ color: 'green' }}>&#10004;</span> {feature.title}</li>
           ))
         }
       </ul>
       <p>
          {
            room.ratePlans[0].cancellation.free 
            ? <span className={classes.cancellationIcon} style={{ color: 'green' }}>&#10004;</span>
            : <span className={classes.cancellationIcon} style={{ color: 'red' }}>&#10008;</span>
          }
          {room.ratePlans[0].cancellation.title}
        </p>
        <p className={classes.cancellationInfo}>{room.ratePlans[0].cancellation.additionalInfo}</p>

     </div>
     <div className={classes.price}>
        <p className={classes.oldPrice}>{room.ratePlans[0].price.old}</p>
        <p className={classes.currentPrice}>{room.ratePlans[0].price.current}</p>
     </div>
   </div>
  )
}