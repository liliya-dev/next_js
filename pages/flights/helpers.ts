export const getCity = async (value: string) => {
 
  const response = await fetch(
    `https://rapidapi.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/UAH/en-GB/?query=${value}`, 
    {
      "method": "GET",
      "headers": {
          "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      }
    }
  );
  const data = await response.json();
  return data;
}

export const formatDate = (value: number) => {
  const date = new Date(value)
  const month = '' + (date.getMonth() + 1);
  const day = '' + date.getDate();
  const year = date.getFullYear();

  return [year, month, day].join('-');
}

export const getFlights = async (
  country, currency, locale, originplace, 
  destinationplace,
  outboundpartialdate, inboundpartialdate
) => {

  // const response = await fetch(`https://rapidapi.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currency}/${locale}/${originplace}/${destinationplace}/${outboundpartialdate}`,
  //  {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
  //     "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
  //   }
  // })

  const response = await fetch("https://rapidapi.p.rapidapi.com/pde/property-details/v1/hotels.com/1070017152?checkIn=2021-01-27&locale=en_US&rooms=1&checkOut=2021-01-28&currency=USD", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
      "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
    }
  })

  const data = await response.json();

  console.log

  return data
}