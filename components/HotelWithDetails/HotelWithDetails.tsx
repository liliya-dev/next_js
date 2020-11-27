import React from 'react';
import classes from './HotelWithDetails.module.scss';
import { PhotosCarousel } from './PhotosCarousel/PhotosCarousel';

export const HotelWithDetails = ({ hotelData, photos }) => {
  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <div className={classes.imagesWrapper}>
          <PhotosCarousel photos={photos.hotelImages} />
        </div>
      </div>
    </div>
  )
}