import classes from './ReviewItem.module.scss';
import { formatDate } from './helpers';

interface Props {
  review: {
    formattedRating: string,
    postedOn: string,
    qualitativeBadgeText: string,
    rating: string,
    summary: string,
    title: string
  }
}

export const ReviewItem: React.FC<Props> = ({ review }) => {
  const date = formatDate(+review.postedOn);
  return (
    <li key={review.postedOn + review.summary} className={classes.item}>
      <h4>{review.title}</h4>
      <p className={`${classes.rating} fs-18-italic-bold`}>{review.formattedRating}</p>
      <p className={`${classes.date} fs-14-italic-bold`}>{date}</p>
      {
        review.summary
          ? <p className="fs-16-italic">{review.summary}</p>
          : <p className="fs-16-italic">No summary</p>
      }
    </li>
  )
}