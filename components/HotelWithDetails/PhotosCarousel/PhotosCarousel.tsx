import classes from './PhotosCarousel.module.scss'
import next from './next.png';
import React, { useState, useRef } from 'react'
import { getPhotoUrl } from './helpers'
import { BigSizePhotoCarousel } from './BigSizePhotoCarousel/BigSizePhotoCarousel';

export const PhotosCarousel = ({ photos }) => {
  const [bigPhotoIndex, setBigPhotoIndex] = useState(0);
  const [isBigCarouselVisible, setIsBigCarouselVisible] = useState(false);
  const scrollList = useRef(null);

  const closeBigCarousel = () => {
    setIsBigCarouselVisible(false);
  }

  const setNextIndex = (direction) => {
    let nextIndex;
    if (direction === 'next') {
      nextIndex = bigPhotoIndex === photos.length - 1 ? 0 : bigPhotoIndex + 1;
    } else if (direction === 'back') {
      nextIndex = bigPhotoIndex === 0 ? photos.length - 1 : bigPhotoIndex - 1;
    }
    setBigPhotoIndex(nextIndex);
    scrollList.current.scrollLeft = nextIndex * 160;
  }
  return (
    <div className={classes.mainContainer}>
      { isBigCarouselVisible && <BigSizePhotoCarousel photos={photos} closeBigCarousel={closeBigCarousel} />}
      <div className={classes.mainImageWrapper}>
        <button 
          type="button" 
          className={`${classes.moveButton} ${classes.previousButton}`}
          onClick={() => setNextIndex('back')}
        >
          <img src={next} alt="back"/>
        </button>
        <img 
          src={getPhotoUrl(photos[bigPhotoIndex].baseUrl, 'y')} 
          alt="hotel"
          onClick={() => setIsBigCarouselVisible(true)}
        />
        <button 
          type="button" 
          className={`${classes.moveButton} ${classes.nextButton}`}
          onClick={() => setNextIndex('next')}
        >
          <img src={next} alt="next"/>
        </button>
      </div>
      <div className={classes.imagesListWrapper} ref={scrollList}>
        <ul className={classes.imagesList}>
          {
            photos.map((photo, index) => {
              return (
                <li 
                  className={classes.imagesListItem}
                  style={index === bigPhotoIndex ? {border: '3px solid rgba(0, 166, 152, 0.6)'}: {}}
                  key={photo.imageId}
                  onClick={() => setBigPhotoIndex(index)}
                >
                  <img src={getPhotoUrl(photo.baseUrl, 'e')} alt=""/>
                </li>
              )
              
            })  
          }
        </ul>
      </div>
    </div>
  )
}