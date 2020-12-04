import classes from './AccomodationsPage.module.scss';
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from './helpers';
import { searchResult } from './interface';
import { SearchForm } from '../../components/SearchComponents/SearchForm/SearchForm';

interface Props {
  isError: boolean,
  hotels: searchResult[],
  count: number,
  page: number,
  nextPage: number,
  isLoaded: boolean,
  checkIn: string,
  checkOut: string,
  lat: string,
  lon: string,
  rooms: string | number,
  currency: string
}

const AccomodationsPage: NextPage<Props> = ({ 
  hotels, isError, page, nextPage, isLoaded, checkIn, checkOut, lat, lon, rooms, currency
}) => {
  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  const [successLoaded, setSuccessLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(1)
    setTimeout(() => {
      const hotelsNew = [...hotels]
      setHotelsList(hotelsNew);
      setSuccessLoaded(isLoaded);
      setIsLoading(false);
    }, 300)
  }, [lat, lon, rooms, currency, checkOut, checkIn]);
  console.log(hotelsList)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setHotelsList([...hotelsList, ...hotels]);
  //     setSuccessLoaded(isLoaded);
  //     setIsLoading(false);
  //   }, 300)
  // }, [hotels, isLoaded]);

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
    setSuccessLoaded(false);
    setIsLoading(true);
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
      <SearchForm />
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
            <AccomodationsList 
              hotels={hotelsList} 
              isLoaded={successLoaded} 
              loadMore={changePage}
              nextPage={nextPage}
              isLoading={isLoading}
            />
          </>
        )
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const { checkIn, checkOut, lat, lon, page, rooms, currency } = context.query;
  try {
    const hotels = await getHotels(checkIn, checkOut, lat, lon, page, rooms, currency);
    const nextNumber = hotels.pagination && hotels.pagination.nextPageNumber  ? hotels.pagination.nextPageNumber : 1;
    if (hotels.results) {
      return {
        props: {
          hotels: hotels.results || [],
          isError: false,
          nextPage: nextNumber,
          page,
          isLoaded: true,
          checkIn, checkOut, lat, lon, rooms, currency
        }
      }
    }
  } catch (error) {
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