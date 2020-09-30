
import { Beer } from "../../components/BeersList/interfaces";
import { NextPage, NextPageContext } from 'next';

interface Props {
    beer: Beer[];
}
const BeerPage: NextPage<Props> = ({ beer }) => {
    console.log(beer, "beer page")
    return (
        <h1>{beer[0].name}</h1>
    )
}

BeerPage.getInitialProps = async (context: NextPageContext) => {
    console.log(context.query.name)
    const name = context.query.name;

    const request = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`);
    const beer = await request.json();
    return { 
       beer,
    }
  }

export default BeerPage;