import { BeersList } from "../../components/BeersList/BeersList";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { Filter } from '../../components/Filter/Filter';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

export default function BeersPage({ beersList }) {
    const router = useRouter();
    const initialQuery = 
        typeof router.query.beer_name === 'string' || typeof router.query.beer_name === 'undefined'
            ? router.query.beer_name 
            : router.query.beer_name.join();
    const [name, setName] = useState<string>(initialQuery);
    const [page, setPage] = useState(router.query.page);

    useEffect(() => {
        router.push({
            query: { 
                beer_name: name,
                page: 1 
            },
        });
        
    }, [name]);

    const handleChangeQuery = (value: string) => {
        setName(value);
    }


    const makeApiCall = () => {
        const params = {
            beer_name: name,
            page,
        };
        router.push({
            query: params,
        });

    }

    return (
        <MainLayout title="about">
            <Filter value={name} setValue={handleChangeQuery} makeApiCall={makeApiCall}/>
            {
                beersList.length
                    ?  <BeersList beersList={beersList}/>
                    :  <p>Results were not found</p>
            }
         
        </MainLayout>
    )
}

BeersPage.getInitialProps = async (context) => {
    let searchParametrs = '';
    Object.entries(context.query).forEach(
        param => {
            if(param[1] !== "") {
                searchParametrs = `${searchParametrs}${param[0]}=${param[1]}&`
            }
        }
    );
    console.log(searchParametrs)
    const response = await fetch(`https://api.punkapi.com/v2/beers?${searchParametrs}`);
    const beersList = await response.json();
    return { 
        beersList,
    }
  }