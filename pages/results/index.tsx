import { useRouter } from "next/router";
import { useState } from "react";
import { AccomodationsList } from "../../components/AccomodationsList/AccomodationsList";
import { getHotels } from './helpers';

interface searchResult {
  address: {
    countryCode: string,
    countryName: string,
    extendedAddress: string,
    locality: string,
    obfuscate: boolean
    postalCode: string,
    region: string,
    streetAddress: string,
  },
  guestReviews: {
    badge: string,
    badgeText: string,
    rating: string,
    scale: number,
    unformattedRating: number,
    total: number,
  }
}

const Results = ({ hotels, isError }) => {

  const router = useRouter();
  const [hotelsList, setHotelsList] = useState([]);
  
  const redirectBack = () => {
    console.log(hotels.results, isError)
  }

  const reload = () => {
    router.reload();
  }
  return (
    <div>
      <button 
        type="button"
        onClick={redirectBack}
      >
        Back to search form
      </button>
      {
        isError 
        ? (
          <div>
            <p>some error occured during request, please try again</p>
            <button onClick={reload}type="button">try again</button>
          </div>
        )
        : (
          <AccomodationsList />
        )
      }
    </div>
  )
}

export async function getServerSideProps(context) {
  const { checkIn, checkOut, lat, lon } = context.query;
  try {
    const hotels = await getHotels(checkIn, checkOut, lat, lon);
    return {
      props: {
        hotels,
        isError: false
      }
    }
  } catch (error) {
    return {
      props: {
        hotels: [],
        isError: true
      }
    }
  } 
}

export default Results;