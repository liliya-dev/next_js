import { useState } from 'react';
import classes from './BookItem.module.scss';
import { BookitemDetails } from './BookitemDetails/BookitemDetails';
import { Room } from '../interface';

interface Props {
  room: Room
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
     {
       room.images[0] && room.images[0].thumbnailUrl 
       ? (
        <div className={classes.photos}>
          <img 
            onClick={() => setIsDetailVisible(true)}
            src={room.images[0].thumbnailUrl} 
            alt={room.name}
          />
        </div>
       )
       : <p onClick={() => setIsDetailVisible(true)} className={`fs-18-italic ${classes.noPhoto}`}>No photos yet</p>
     }
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
        {room.ratePlans[0].price.totalPricePerStay && 
        <>
          <p className={classes.currentPrice}>for night</p>
          <p 
            className={`${classes.totlaPrice} fs-12`}
            dangerouslySetInnerHTML={{__html: room.ratePlans[0].price.totalPricePerStay}}
          >
          </p>
        </>
        }
     </div>
   </div>
  )
}