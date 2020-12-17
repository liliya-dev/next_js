import next from '../next.png';
import { useState, useRef } from 'react';
import { getPhotoUrl } from '../helpers';
import classes from './BigSizePhotoCarousel.module.scss';

const ACTIVE_BORDER = '3px solid rgba(0, 166, 152, 0.6)';

export const BigSizePhotoCarousel = ({ photos, closeBigCarousel }) => {
  const [bigPhotoIndex, setBigPhotoIndex] = useState(0);
  const scrollList = useRef(null);

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
    <div id="big-photo-carousel" className={classes.container}>
      <button 
        type="button" 
        className={classes.closeButton}
        onClick={closeBigCarousel}
      >
        +
      </button>
      <div className={classes.mainImageWrapper}>
        <button 
          type="button" 
          className={`${classes.moveButton} ${classes.previousButton}`}
          onClick={() => setNextIndex('back')}
        >
          <img src={next} alt="back"/>
        </button>
        <img 
          src={getPhotoUrl(photos[bigPhotoIndex].baseUrl, 'z')} 
          alt="hotel photo"
          className={classes.mainImage}
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
                  style={index === bigPhotoIndex ? {border: ACTIVE_BORDER }: {}}
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