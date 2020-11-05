import { NextPageContext } from 'next';
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { SearchInputWithList } from '../../components/SearchInputWithList/SearchInputWithList';
import classes from './flightsPage.module.scss';
import { getCity, getFlights, formatDate } from './helpers';
import { SearchIputDate } from '../../components/SearchInputDate/SearchIputDate';
import { ChangeButton } from '../../components/ChangeButton/ChangeButton';
import { FlightInfo } from '../../components/FlightInfo/FlightInfo';

const FlightPage = ({ originList, destinationList }) => {
  const router = useRouter();
  const [originPlace, setOriginPlace] = useState(router.query.origin + '');
  const [originCityId, setOriginCityId] = useState('');
  const [destinationPlace, setDestinationPlace] = useState(router.query.destination + '');
  const [destinationCityId, setDestinationCityId] = useState('');
  const [departureDate, setDepartureDate] = useState(Date.now());
  const [returnDate, setReturnDate] = useState(Date.now() + 86400000);

  const upadateDepartureDate = (date: number) => {
    setDepartureDate(date);
  }

  const upadateReturnDate = (date: number) => {
    setReturnDate(date);
  }

  const updateOriginCityId = (value: string) => {
    setOriginCityId(value);
  }

  const updateOriginPlace = (value: string) => {
    setOriginPlace(value);
  }

  const updateDestinationCityId = (value: string) => {
    setDestinationCityId(value);
  }

  const updateDestinationPlace = (value: string) => {
    setDestinationPlace(value);
  }

  const changeCities = () => {
    const temporaryOriginPlace = destinationPlace;
    const temporarydestinationPlace = originPlace;
    const temporaryOriginCityId = destinationCityId;
    const temporarydestinationCityId = originCityId;
    setOriginPlace(temporaryOriginPlace);
    setDestinationPlace(temporarydestinationPlace);
    setOriginPlace(temporaryOriginCityId);
    setDestinationPlace(temporarydestinationCityId);
  }

  useEffect(() => {
    if (originPlace.length) {
      if (originList.Places.length === 1) {
        setOriginCityId(originList.Places[0].CityId);
      }
    }
    if (destinationPlace.length) {
      if (destinationList.Places.length === 1) {
        setDestinationCityId(destinationList.Places[0].CityId);
      }
    }
  }, [])

  const handleClick = () => {
    router.push({
      query: { 
        ...router.query,
        search: true, 
        originplace: originCityId,
        destinationplace: destinationCityId,
        outboundpartialdate: formatDate(departureDate),
        inboundpartialdate: formatDate(returnDate)
      },
    });
  }

  useEffect(() => {
    router.push({
      query: { 
        origin: originPlace,
        destination: destinationPlace
      },
    });  
  }, [originPlace, destinationPlace]);

    return (
      <div className={classes.page}>
        <div className={classes.container}>
          <div className={classes.inputWrapper}>
            <SearchInputWithList 
              text='From'
              place={originPlace}
              placesList={originList}
              updateCityId={updateOriginCityId}
              updatePlace={updateOriginPlace}
              additionalStyle={{ borderRadius: '.25rem 0 0 .25rem' }}
            />
            <ChangeButton changeCities={changeCities} />
            <SearchInputWithList 
              text='To'
              place={destinationPlace}
              placesList={destinationList}
              updateCityId={updateDestinationCityId}
              updatePlace={updateDestinationPlace}
            /> 
            <SearchIputDate 
              text='Depart'
              initialDate={departureDate}
              updateDate={upadateDepartureDate}
            />   
            <SearchIputDate 
              text='Return'
              initialDate={returnDate}
              updateDate={upadateReturnDate}
            /> 
            <FlightInfo 
              text={`Cabin Class & Travellers`}
            />  
          </div>
          <button onClick={handleClick}>search</button>
        </div>
      </div>
    )
}

FlightPage.getInitialProps = async (context: NextPageContext) => {
  const originList = await getCity(`${context.query.origin}`);
  const destinationList = await getCity(`${context.query.destination}`);

  if (context.query.search) {
    const flights = await getFlights(
      'US', 'USD', 'en-US', context.query.originplace, context.query.destinationplace,
      context.query.outboundpartialdate, context.query.inboundpartialdate,
    )

    console.log(flights)
  }

    return { 
      originList,
      destinationList
    }
  }

  export default FlightPage;