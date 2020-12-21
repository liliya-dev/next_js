import { NextPage, NextPageContext } from "next";
import { getReviews } from '../../utils/reviews/helpers';
import { Reviews } from '../../utils/reviews/interface';
import { ReviewsList } from '../../components/ReviewsList/ReviewsList';
import classes from './ReviewsPage.module.scss';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MainLayout } from '../../components/MainLayout/MainLayout';

interface Props {
  reviews: Reviews,
  isLoaded: boolean,
  page: string | string[],
}

const ReviewsPage: NextPage<Props> = ({ reviews, isLoaded, page }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [reviewsList, setReviewsList] = useState(reviews.reviewData.guestReviewGroups.guestReviews.map(item => item).flat());
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (+page === 1) {
        setReviewsList(reviews.reviewData.guestReviewGroups.guestReviews.map(item => item).flat());
      } else {
        setReviewsList([...reviewsList, ...reviews.reviewData.guestReviewGroups.guestReviews.map(item => item).flat()]);
      }
      setIsLoading(false);
    }, 30)
  }, [reviews, isLoaded]);

  const loadMore = () => {
    setIsLoading(true);
      router.push({
      query: {
        ...router.query,
        page: +page + 1
      },
    })
  }

  useEffect(() => {
    if (+page != 1) {
      setReviewsList([])
      router.push({
        query: {
          ...router.query,
          page: 1
        },
      })
    }
  }, [])
  
  return (
    <MainLayout title="reviews">
      <div className={classes.container}>
        <ul className={classes.list}>
          {
            reviewsList.map((reviewsItem, index) => (
              <ReviewsList 
                key={reviewsItem.id + page + index} 
                reviews={reviewsItem.reviews} 
                isLoading={isLoading}
                loadMore={loadMore}
                isLast={index === reviewsList.length - 1}
                nextPage={reviews.reviewData.guestReviewGroups.guestReviewPagination.nextPage}
              />
            ))
          }
        </ul>
      </div>
    </MainLayout>
  )
}

ReviewsPage.getInitialProps = async (context: NextPageContext) => {
  try {
    let { id, page } = context.query;
    if (!page) {
      page = '1';
    }
    const reviews = await getReviews(id, page);
    
    return { 
      reviews,
      isLoaded: true,
      page,
    }
  }
  catch(error) {
    console.log(error)
  }
}

export default ReviewsPage;