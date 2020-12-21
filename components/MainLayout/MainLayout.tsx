import React from 'react';
import classes from './MainLayout.module.scss';
import Head from 'next/head';
import Link from 'next/link';

export const MainLayout = ({ children, title = "HOTELS" }) => {

  return (
    <>
      <Head>
        <title>{title} | HOTELS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.layout}>  
        <Link href="/search">
          <button 
            type="button"
            className={`${classes.button} fs-18-italic-bold`}
          >
            Home
          </button> 
        </Link>
        <div className={classes.content}>  
          {children}
        </div> 
      </div>
    </>
)
}