export interface Reviews {
  reviewData: {
    guestReviewGroups: {
      guestReviewPagination: {
        nextPage: boolean,
        previousPage: boolean,
        page: number
      },
      guestReviews: {
        id: string,
        reviews: {
          formattedRating: string,
          postedOn: string,
          qualitativeBadgeText: string,
          rating: string,
          summary: string,
          title: string
        }[]
      }[]
    }
  }
}