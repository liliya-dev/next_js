import { useRef, useState } from 'react';
import classes from './BookitemDetails.module.scss';
import { Room } from '../../interface';
import next from './next.png';

interface Props {
  closeDetails: () => void,
  room: Room
}

const HIGHLETED_BORDER_COLOR = '3px solid rgba(0, 166, 152, 0.6)';

export const BookitemDetails: React.FC<Props> = ({ room, closeDetails }) => {
  const [activePhotoId, setActivePhotoId] = useState(0);
  const scrollList = useRef(null);

  const setNextIndex = (direction) => {
    let nextIndex;
    if (direction === 'next') {
      nextIndex = activePhotoId === room.images.length - 1 ? 0 : activePhotoId + 1;
    } else if (direction === 'back') {
      nextIndex = activePhotoId === 0 ? room.images.length - 1 : activePhotoId - 1;
    }
    setActivePhotoId(nextIndex);
    scrollList.current.scrollLeft = nextIndex * 130;
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h4>{room.name}</h4>
        <button 
          type="button" 
          className={classes.closeButton}
          onClick={closeDetails}
        >
          +
        </button>
      </div>
      <div className={classes.topRow}>
        {
          room.images && room.images[activePhotoId] && room.images[activePhotoId].fullSizeUrl 
          ? (
            <div className={classes.photos}>
              <button 
                type="button" 
                className={`${classes.moveButton} ${classes.previousButton}`}
                onClick={() => setNextIndex('back')}
              >
                <img src={next} alt=""/>
              </button>
              <img src={room.images[activePhotoId].fullSizeUrl} alt="hotel photo" className={classes.mainPhoto}/>
              <button 
                type="button" 
                className={`${classes.moveButton} ${classes.nextButton}`}
                onClick={() => setNextIndex('next')}
              >
                <img src={next} alt=""/>
              </button>
              <div className={classes.photosTitle}>
                &#128247; {activePhotoId + 1}/{room.images.length} {room.images[activePhotoId].caption}
              </div>
              <div className={classes.photosListWrapper} ref={scrollList}>
                <ul className={classes.photosList}>
                  {
                    room.images.map((image, index) => (
                      <li 
                        key={image.fullSizeUrl}
                        className={classes.photosItem}
                        style={index === activePhotoId ? { border: HIGHLETED_BORDER_COLOR }: {}}
                        onClick={() => setActivePhotoId(index)}
                      >
                        <img src={image.thumbnailUrl} alt={image.caption} />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          )
          : (
            <div className={classes.photos}>
              <p className={`fs-18-italic ${classes.noPhoto}`}>No photos yet</p>
            </div>
          )
        }
        <div className={classes.optionsWrapper}>
          <p className={classes.optionsTitle}>Amenities:</p>
          <ul className={classes.options}>
            {
              room.additionalInfo.details && room.additionalInfo.details.amenities && room.additionalInfo.details.amenities.map(option => (
                <li key={option} className={`fs-12-italic`}>&#9733; &nbsp;{option}</li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={classes.middleRow}>
        <p dangerouslySetInnerHTML={{__html: room.additionalInfo.description}}></p>
          <p>{room.ratePlans[0].cancellation.info}</p>
      </div>
    </div>
  )
}