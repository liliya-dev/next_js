import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from './helpers';
import { searchResult } from './interface';
import Link from 'next/link'
import classes from './accomodationsPage.module.scss';

interface Props {
  isError: boolean,
  hotels: searchResult[],
  count: number,
  page: number,
  nextPage: number,
  isLoaded: boolean
}

const AccomodationsPage: NextPage<Props> = ({ hotels, isError, page, nextPage, isLoaded }) => {
  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  const [successLoaded, setSuccessLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHotelsList([...hotelsList, ...hotels]);
      setSuccessLoaded(isLoaded);
    }, 2000)
  }, [hotels, isLoaded]);

  useEffect(() => {
    if (page != 1) {
      setHotelsList([])
      router.push({
        query: {
          ...router.query,
          page: 1
        },
      })
    }
  }, [])

  const changePage = () => {
    setSuccessLoaded(false)
      router.push({
      query: {
        ...router.query,
        page: +page + 1
      },
    })
  }

  const reload = () => {
    router.reload();
  }
  return (
    <div className={classes.container}>
      <button 
        type="button"
        className={classes.loadButton} 
      >
         <Link href="/search">
            <a>Back to search</a>
        </Link>
      </button>
      {
        isError 
        ? (
          <div>
            <p>some error occured during request, please try again</p>
            <button onClick={reload} type="button">try again</button>
          </div>
        )
        : (
          <>
            <AccomodationsList hotels={hotelsList} isLoaded={successLoaded}/>
            {
              (nextPage !== 1)  &&  (
                <button 
                  type="button"
                  className={classes.loadButton} 
                  onClick={changePage}
                >
                  more results
                </button>
              )
            }
          </>
        )
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const { checkIn, checkOut, lat, lon, page } = context.query;
  try {
    const hotels = await getHotels(checkIn, checkOut, lat, lon, page);
    const nextNumber = hotels.pagination ? hotels.pagination.nextPageNumber : 1;
    if (hotels.results) {
      return {
        props: {
          hotels: hotels.results || [],
          isError: false,
          nextPage: nextNumber,
          page,
          isLoaded: true
        }
      }
    }
  } catch (error) {
    console.log(error, 8767)
    return {
      props: {
        hotels: [],
        isError: true,
        nextPage: 1,
        count: 0,
        page
      }
    }
  } 
}

export default AccomodationsPage;