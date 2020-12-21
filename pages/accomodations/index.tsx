import React, { useEffect, useState } from "react";
import { useWindowResize } from "beautiful-react-hooks";
import classes from './accomodationsPage.module.scss';
import { NextPage } from "next";
import { useRouter } from "next/router";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from '../../utils/accomodations/helpers';
import { searchResult } from '../../utils/accomodations/interface';
import { SearchForm } from '../../components/SearchComponents/SearchForm/SearchForm';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { ReloadButton } from '../../components/ReloadButton/ReloadButton';

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

const MOBILE_VIEW = 900;

const AccomodationsPage: NextPage<Props> = ({ 
  hotels, isError, page, nextPage, isLoaded
}) => {
  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  const [successLoaded, setSuccessLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isMobileVisible, setIsMobileVisible] = useState(false);

  useWindowResize(() => {
    setWindowWidth(window.innerWidth);
  });

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
    setWindowWidth(window.innerWidth);
    setIsLoading(true);
    if (page != 1) {
      setHotelsList([])
      router.push({
        query: {
          ...router.query,
          page: 1
        },
      })
    }
    setIsLoading(false);
  }, [])

  const changePage = () => {
    setIsLoading(true);
    setSuccessLoaded(false);
      router.push({
      query: {
        ...router.query,
        page: +page + 1
      },
    })
  }

  const setLoadingFromChild = () => {
    setIsLoading(true);
  }

  const toggleMenu = () => {
    setIsMobileVisible(!isMobileVisible);
  }

  return (
    <MainLayout title="results">
      <div className={classes.container}>
        {
          windowWidth > MOBILE_VIEW
            ? <SearchForm isLoadingFromParent={isLoading} />
            : (
              isMobileVisible
              ? (
                <>
                  <SearchForm isLoadingFromParent={isLoading} />
                  <button onClick={toggleMenu} type="button" className={classes.button}>Hide search form &#x279A;</button>
                </>
              )
              : <button onClick={toggleMenu} type="button" className={classes.button}>Show search form &#x2798;</button>
            )
        }
        {
          isError 
          ? <ReloadButton />
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
    } else {
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