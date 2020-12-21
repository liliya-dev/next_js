import classes from './ReviewsList.module.scss';
import { ReviewItem } from './ReviewItem/ReviewItem';
import { SearchButton } from '../SearchComponents/SearchButton/SearchButton';
import { Review } from './interface';

interface Props {
  reviews: Review[],
  nextPage: boolean,
  isLoading: boolean,
  loadMore: () => void,
  isLast: boolean
}

export const ReviewsList: React.FC<Props> = ({ reviews, nextPage, isLoading, loadMore, isLast }) => {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        {
          reviews && reviews.map(review => <ReviewItem review={review} key={review.postedOn + review.summary} />)
        }
      </ul>
      {
        nextPage && isLast && (
          <div className={classes.wrapper}>
            <SearchButton isLoading={isLoading} handleClick={loadMore} title='more results' />
          </div>
        )
      }
    </div>
  )
}