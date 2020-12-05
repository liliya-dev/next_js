import classes from './Reviews.module.scss';

export const Reviews = ({ unformattedRating, scale, badgeText, total }) => {
  return (
    <>
    <span className={classes.ratingWrapper}>
      <div className={`${classes.ratingValue} fs-16-bold`}>
        {unformattedRating} / {scale}
      </div>
      <p className="fs-16-bold">{badgeText}</p>
    </span>
    <p className="fs-14-italic">{total} reviews</p>
  </>
  )
}