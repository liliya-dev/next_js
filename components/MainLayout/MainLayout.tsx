import React from 'react';
import classes from './MainLayout.module.scss';
import Head from 'next/head';

export const MainLayout = ({ children, title = "HOTELS" }) => {
  return (
    <>
      <Head>
        <title>{title} | HOTELS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.layout}>    
        {children}
      </div>
    </>
)
}