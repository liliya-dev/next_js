import classes from './SortOrder.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

const options = [
  { value: 'BEST_SELLER', label: 'Best seller' },
  { value: 'PRICE', label: 'Price lowest first' },
  { value: 'PRICE_HIGHEST_FIRST', label: 'Price highest first' },
  { value: 'STAR_RATING_HIGHEST_FIRST', label: 'Star rating highest first' },
  { value: 'STAR_RATING_LOWEST_FIRST', label: 'Star rating lowest first' },
  { value: 'GUEST_RATING', label: 'Guest rating' },
  { value: 'SPECIAL_DEALS', label: 'Special deals' },
  { value: 'DISTANCE_FROM_LANDMARK', label: 'Distance from landmark' },
  { value: 'NO_SORT', label: 'No sort' },
];

const findIndex = (option) => {
  const index = options.findIndex(item => item.value === option);

  return index === -1 ? 8 : index;
}

interface Props {
  setIsLoading: () => void;
}

export const SortOrder: React.FC<Props> = ({ setIsLoading }) => {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState(findIndex(router.query.sortOrder));

  const changeSortOrder = (index: number) => {
    setActiveOption(index);
    setIsLoading();
    router.push({
      pathname: '/accomodations',
      query: {
        ...router.query,
        sortOrder: options[index].value
      }
    })
  }

  return (
    <div className={classes.container}>
       <ul className={classes.list}>
         {
           options.map((item, index) => (
            <li 
              key={item.value}
              className={index !== activeOption 
                ? `${classes.item} fs-12-italic-bold` 
                : `${classes.activeItem} fs-12-italic-bold`}
              onClick={() => changeSortOrder(index)}
            >
              {item.label}
            </li>
           ))
         }
       </ul>
    </div>
  )
}