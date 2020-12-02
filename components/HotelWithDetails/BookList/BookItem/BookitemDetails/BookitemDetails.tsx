import { useRef, useState } from 'react';
import classes from './BookitemDetails.module.scss';
import next from './next.png';

interface Props {
  closeDetails: () => void,
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
        <div className={classes.photos}>
          <button 
            type="button" 
            className={`${classes.moveButton} ${classes.previousButton}`}
            onClick={() => setNextIndex('back')}
          >
            <img src={next} alt=""/>
          </button>
          <img src={room.images[activePhotoId].fullSizeUrl} alt="" className={classes.mainPhoto}/>
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
                    className={classes.photosItem}
                    style={index === activePhotoId ? {border: '3px solid rgba(0, 166, 152, 0.6)'}: {}}
                    onClick={() => setActivePhotoId(index)}
                  >
                    <img src={image.thumbnailUrl} alt={image.caption} />
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={classes.optionsWrapper}>
          <p className={classes.optionsTitle}>Amenities:</p>
          <ul className={classes.options}>
            {
              room.additionalInfo.details && room.additionalInfo.details.amenities && room.additionalInfo.details.amenities.map(option => (
                <li className={`fs-12-italic`}>&#9733; &nbsp;{option}</li>
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