
import { Beer } from "../../components/BeersList/interfaces";
import { NextPage, NextPageContext } from 'next';

interface Props {
    beer: Beer[];
}
const BeerPage: NextPage<Props> = ({ beer }) => {
    return (
        <h1>{beer[0].name}</h1>
    )
}

BeerPage.getInitialProps = async (context: NextPageContext) => {
    const name = context.query.name;
    const request = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`);
    const beer = await request.json();
    return { 
       beer,
    }
  }

export default BeerPage;