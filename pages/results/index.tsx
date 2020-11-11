import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from './helpers';
import { searchResult } from './interface';
import { Pagination } from '../../components/Pagination/Pagination';
import Link from 'next/link'

interface Props {
  isError: boolean,
  hotels: searchResult[],
  count: number,
  page: number,
  nextPage: number
}

function scrollTo(container: any) {
  container.scrollTop = 200;
  console.log(88)
}

const Results: NextPage<Props> = ({ hotels, isError, page, nextPage }) => {
  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  const [yScroll, setYscroll] = useState(0);
  const scrollableEl = useRef(null);

  useEffect(() => {
    setHotelsList([...hotelsList, ...hotels])
    scrollTo(scrollableEl.current)
  }, [hotels]);

  useEffect(() => {
    if (page !== 1) {
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
    <div>
      <button 
        type="button"
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
            <AccomodationsList hotels={hotelsList} scrollableEl={scrollableEl} />
            {
              (nextPage !== 1)  &&  (
                <button 
                  type="button" 
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
    return {
      props: {
        hotels: hotels.results,
        isError: false,
        count: hotels.totalCount,
        nextPage: hotels.pagination.nextPageNumber,
        page
      }
    }
  } catch (error) {
    console.log(error)
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

export default Results;