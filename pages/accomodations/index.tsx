import React, { useEffect, useState } from "react";
import classes from './AccomodationsPage.module.scss';
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from '../../components/pages/accomodations/helpers';
import { searchResult } from '../../components/pages/accomodations/interface';
import { SearchForm } from '../../components/SearchComponents/SearchForm/SearchForm';
import { MainLayout } from '../../components/MainLayout/MainLayout';

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
  hotels, isError, page, nextPage, isLoaded
}) => {
  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  const [successLoaded, setSuccessLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (+page === 1) {
        setHotelsList(hotels);
      } else {
        setHotelsList([...hotelsList, ...hotels]);
      }
      setSuccessLoaded(isLoaded);
      setIsLoading(false);
    }, 30)
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

  const setLoadingFromChild = () => {
    setIsLoading(true);
  }

  return (
    <MainLayout title="results">
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
                setIsLoading={setLoadingFromChild}
              />
            </>
          )
        }
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  let { checkIn, checkOut, lat, lon, page, rooms, currency, sortOrder } = context.query;

  if (!sortOrder) {
    sortOrder = 'NO_SORT';
  }

  try {
    const hotels = await getHotels(checkIn, checkOut, lat, lon, page, rooms, currency, sortOrder);
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