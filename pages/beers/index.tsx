import { NextPage, NextPageContext } from 'next';
import { BeersList } from "../../components/BeersList/BeersList";
import { MainLayout } from "../../components/Layouts/MainLayout/MainLayout";
import { Filter } from '../../components/Filter/Filter';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { convertToString } from '../../helpers/convertToString';
import classes from './beersPage.module.scss';
import { Beer } from "../../components/BeersList/interfaces";

interface Props {
    beersList: Beer[];
}

const BeersPage: NextPage<Props> = ({ beersList }) => {
    const router = useRouter();
    const [beerName, setBeerName] = useState<string>(convertToString(router.query.beer_name));
    const [foodPairing, setFoodPairing] = useState<string>(convertToString(router.query.food_pairing));

    useEffect(() => {
        router.push({
            query: { 
                beer_name: beerName,
                food_pairing: foodPairing,
            },
        });
        
    }, [beerName, foodPairing]);

    const handleChangeParams = (value: string, option: string) => {
        switch (option) {
            case 'beerName': 
                setBeerName(value);
                break;
            case 'foodPairing':
                setFoodPairing(value)
        }  
    }

    return (
        <MainLayout title="about">
            <div className={classes.container}>
                <div className={classes.left}>
                    <Filter 
                        beerName={beerName} 
                        foodPairing={foodPairing}
                        setParams={handleChangeParams} 
                    />
                </div>
                <div className={classes.right}>
                    {
                        beersList.length
                            ?  <BeersList beersList={beersList}/>
                            :  <p>Results were not found</p>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

BeersPage.getInitialProps = async (context: NextPageContext) => {
    let searchParametrs = '';
    Object.entries(context.query).forEach(
        param => {
            if(param[1] !== "") {
                searchParametrs = `${searchParametrs}${param[0]}=${param[1]}&`
            }
        }
    );
    const response = await fetch(`https://api.punkapi.com/v2/beers?${searchParametrs}&per_page=80`);
    const beersList = await response.json();
    return { 
        beersList,
    }
  }

  export default BeersPage;