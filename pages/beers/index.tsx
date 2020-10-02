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
    const [beerName, setBeerName] = useState(convertToString(router.query.beer_name));
    const [foodPairing, setFoodPairing] = useState(convertToString(router.query.food_pairing));
    const [malt, setMalt] = useState(convertToString(router.query.malt));
    const [hops, setHops] = useState(convertToString(router.query.hops));

    console.log(beersList)

    useEffect(() => {
        router.push({
            query: { 
                beer_name: beerName,
                food_pairing: foodPairing,
                malt,
                hops
            },
        });
        
    }, [beerName, foodPairing, hops, malt]);

    const handleChangeParams = (value: string, option: string) => {
        switch (option) {
            case 'beerName': 
                setBeerName(value);
                break;
            case 'foodPairing':
                setFoodPairing(value);
                break;
            case 'malt': 
                setMalt(value.split(' ').join('_'));
                break;
            case 'hops':
                setHops(value.split(' ').join('_'));
                break;
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