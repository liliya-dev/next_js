import React from 'react';
import { Navigation } from '../../Navigation/Navigation';
import classes from './MainLayout.module.scss';
import Head from 'next/head';

export const MainLayout = ({ children, title = "Beer" }) => {
    return (
        <>
            <Head>
                <title>{title} | beers</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={classes.layout}>    
                <div className={classes.container}>
                    <Navigation />
                    {children}
                </div>
            </div>
        </>
    )
}
 