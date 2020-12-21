import React, { useState } from 'react';
import classes from './HotelWithDetails.module.scss';
import { PhotosCarousel } from './PhotosCarousel/PhotosCarousel';
import { Reviews } from './Reviews/Reviews';
import { Hotel } from './interface';
import { Maps } from '../Maps/Maps';
import { Overview } from './Overview/Overview';
import { MoreInfo } from './MoreInfo/MoreInfo';
import { BookList } from './BookList/BookList';

interface Props {
  hotelData: Hotel,
  photos: any
}

export const HotelWithDetails: React.FC<Props> = ({ hotelData, photos }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const { latitude, longitude } = hotelData.body.pdpHeader.hotelLocation.coordinates;
  const { guestReviews, overview, atAGlance, roomsAndRates } = hotelData.body;
  const { name } = hotelData.body.propertyDescription;

  return (
    <div className={classes.container}>
      <h2 className={classes.title} >{name}</h2>
      <div className={classes.topRow}>
        <div className={classes.imagesWrapper}>
          <PhotosCarousel photos={photos.hotelImages} />
        </div>
        <div className={classes.reviewsAndMap}>
          <div className={classes.map}>
            <Maps isMarkerShown={true} lat={latitude} lon={longitude} />
          </div>
          <Reviews id={hotelData.body.pdpHeader.hotelId} reviews={guestReviews} />
        </div>
      </div>
      <Overview overview={overview}/>
      <button 
        type="button" 
        className={`${classes.infoButton} fs-16-italic-bold`}
        onClick={() => setIsInfoVisible(!isInfoVisible)}
      >
        More info about accomodation 	
        <div style={{ transform: isInfoVisible ? 'rotate(0deg)' : 'rotate(180deg)'}}>&#8679;</div>
      </button>
      { isInfoVisible && <MoreInfo info={atAGlance} /> }
      <div>
        {roomsAndRates && <BookList rooms={roomsAndRates.rooms}/>}
      </div>
    </div>
  )
}