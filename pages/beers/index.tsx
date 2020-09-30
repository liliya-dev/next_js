import { BeersList } from "../../components/BeersList/BeersList";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { Filter } from '../../components/Filter/Filter';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

function debounce(f, t) {
    return function (args) {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= t)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(args), t);
    }
  }


export default function BeersPage({ beersList }) {
    const [query, setQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        router.push({
            query: { 
                beer_name: query,
                page: 1 
            },
        });
    }, [query]);

    const handleChangeQuery = (value: string) => {
        setQuery(value);
    }

    return (
        <MainLayout title="about">
            <Filter value={query} setValue={handleChangeQuery}/>
            {
                beersList.length
                    ?  <BeersList beersList={beersList}/>
                    :  <p>Results were not found</p>
            }
         
        </MainLayout>
    )
}

BeersPage.getInitialProps = async (context) => {
    console.log(context.query, "context.query")
    let searchParametrs = '';
    Object.entries(context.query).forEach(
        param => {
            if(param[1] !== "") {
                searchParametrs = `${searchParametrs}${param[0]}=${param[1]}&`
            }
        }
    );

    console.log(searchParametrs);
    const response = await fetch(`https://api.punkapi.com/v2/beers?${searchParametrs}`);
    const beersList = await response.json();
    return { 
        beersList,
    }
  }