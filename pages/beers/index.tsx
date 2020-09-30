import { BeersList } from "../../components/BeersList/BeersList";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { Filter } from '../../components/Filter/Filter';
import { useRouter } from 'next/router'
import { useState } from "react";

export default function BeersPage({ beersList }) {
    const [query, setQuery] = useState('');
    const router = useRouter();
   

    const handleChangeQuery = (value: string) => {
        setQuery(value);
        router.push({
            query: { value: query },
          })
    }

    return (
        <MainLayout title="about">
            <Filter value={query} setValue={handleChangeQuery}/>
            <BeersList beersList={beersList}/>
        </MainLayout>
    )
}

BeersPage.getInitialProps = async (context) => {
    console.log(context.query, "context");
    const response = await fetch('https://api.punkapi.com/v2/beers');
    const beersList = await response.json();
    return { 
        beersList,
    }
  }