import classes from './PriceContainer.module.scss';
import { getSalePercent } from './helpers';

export const PriceContainer = ({ ratePlan }) => {
  return (
    <div className={classes.priceContainer}>
      {
        ratePlan.price.old && (
          <div className={`${classes.sale} fs-16-bold`}>
            Sale: {getSalePercent(ratePlan.price.old, ratePlan.price.current)} %
          </div>
        )
      }
      <p className={`${classes.price} fs-30-bold`}>{ratePlan.price.current}</p>
      {
        ratePlan.price.old && (
          <p className={`${classes.oldPrice} fs-18`}>{ratePlan.price.old}</p>
        )
      }
    </div>
  )
}