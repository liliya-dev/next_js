import Link from "next/link";
import React from "react";
import { Beer } from "../BeersList/interfaces";
import classes from './BeerItem.module.scss';

interface Props {
    beer: Beer;
}

export const BeerItem: React.FC<Props> = ({ beer }) => {
    return (
        <li className={classes.container}>
            <Link href={`/beers/${beer.name}`}>
                <a className={classes.wrapper}> 
                    <img className={classes.image} src={beer.image_url} alt={beer.name}/>
                    <h3 className={classes.title}>{beer.name}</h3>
                    <div className={classes.description}>
                        <div className={classes.option}>
                            <h5>Size</h5>
                            <p>0.{beer.volume.value} {beer.volume.unit}</p>
                        </div>
                        <div className={classes.option}>
                            <h5>Rating</h5>
                            <p>{beer.ph}</p>
                        </div>
                        <div className={classes.option}>
                            <h5>Volume</h5>
                            <p>{beer.abv}%</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    )
}