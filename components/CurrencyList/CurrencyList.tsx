import classes from './CurrencyList.module.scss';
import usa from './images/usa.png';
import russia from './images/russia.png';
import ukraine from './images/ukraine.png';
import uk from './images/uk.png';
import china from './images/china.png';
import europe from './images/europe.png';

interface Props {
  setCurrency: (value: string) => void,
  activeCurrency: string
}

export const CurrencyList: React.FC<Props> = ({ setCurrency, activeCurrency }) => {
  const currencies = [
    { value: 'UAH', image: ukraine },
    { value: 'RUB', image: russia },
    { value: 'EUR', image: europe },
    { value: 'USD', image: usa },
    { value: 'GBR', image: uk },
    { value: 'CNY', image: china }
  ]
  return (
    <ul className={classes.list}>
      {
        currencies.map(currency => (
        <li className={classes.option} key={currency.value} onClick={() => setCurrency(currency.value)}>
          <img className={classes.image} src={currency.image} alt={currency.value} />
          <p style={{ fontWeight: 'bold'}}>{currency.value}</p>
        </li>
        ))
      }
    </ul>
  )
}