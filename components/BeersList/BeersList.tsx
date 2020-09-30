import { BeerItem } from '../BeerItem/BeerItem';
import { Beer } from './interfaces';
import classes from './BeersList.module.scss';

interface Props {
    beersList: Beer[],   
};
export const BeersList: React.FC<Props> = ({ beersList }) => {
    return (
        <>
            <ul className={classes.container}>
                {
                    beersList.map(beer => <BeerItem key={beer.name + beer.id} beer={beer}/>)
                }
            </ul>
        </>
    )
}