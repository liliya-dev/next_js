import { BeersList } from "../../components/BeersList/BeersList";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { Filter } from '../../components/Filter/Filter';
import { useState } from "react";

export default function BeersPage({ beersList }) {
    const [query, setQuery] = useState('');

    const handleChangeQuery = (value: string) => {
        setQuery(value);
    }

    console.log(query)

    return (
        <MainLayout title="about">
            <Filter value={query} setValue={handleChangeQuery}/>
            <BeersList beersList={beersList}/>
        </MainLayout>
    )
}

BeersPage.getInitialProps = async () => {
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const beersList = await response.json();
    return { 
        beersList,
    }
  }