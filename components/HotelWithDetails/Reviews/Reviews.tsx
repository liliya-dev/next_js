import classes from './Reviews.module.scss';
import Link from 'next/link'

interface Props {
  reviews: {
    brands: {
      badgeText: string,
      formattedRating: string,
      formattedScale: string,
      rating: string,
      scale: string,
      total: string
    },
    trustYouReviews: {
      categoryName: string,
      percentage: string,
      text: string
    }[]
  },
  id: string
}

export const Reviews: React.FC<Props> = ({ reviews, id }) => {
  return (
    <div>
      {
        reviews && reviews.brands && (
        <div className={classes.reviewsWrapper}>
          <span className={classes.ratingWrapper}>
            <div className={`${classes.ratingValue} fs-20-bold`}>
              {reviews.brands.formattedRating} / {reviews.brands.scale}
            </div>
            <p className="fs-20-bold">{reviews.brands.badgeText}</p>
          </span>
          <Link href={`/reviews/${encodeURIComponent(id)}`}>
            <p className={`${classes.link} fs-18`}>See all {reviews.brands.total} reviews</p>
          </Link>
          <ul className={classes.optionsList}>
            {
              reviews.trustYouReviews && reviews.trustYouReviews.map(option => (
                <li className={classes.optionsItem} key={option.categoryName}>
                  <p className="fs-18-italic-bold ">{option.categoryName}</p>
                  <p className="fs-18-italic">
                    <div 
                      className={classes.optionScale}
                      style={{width: option.percentage+'%'}}
                    ></div>
                    {+option.percentage/10} / 10
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
        )
      }
    </div>

  )
}