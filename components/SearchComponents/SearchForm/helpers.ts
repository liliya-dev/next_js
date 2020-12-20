const baseURL = 'https://rapidapi.p.rapidapi.com/';

export const getSuggestions = async (query) => {
  const response = await fetch(`${baseURL}suggest/v1.7/json?query=${query}&locale=en_US`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
      "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
    }
  })

  if (!response.ok) {
    return new Error
  }

  const data = await response.json();
  let suggestions = [];
  if (data.suggestions) {
    suggestions = data.suggestions.map(item => item.entities).flat();
  }
  return suggestions
}

export const formatDate = (value: number) => {
  const date = new Date(value)
  const month = `${date.getMonth() + 1}`.length === 1 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
  const day = `${date.getDate()}`.length === 1 ? `0${date.getDate()}` : `${date.getDate()}`;
  const year = date.getFullYear();

  return [year, month, day].join('-');
}

export const getInitialValue = (router) => {
  const isAccomodations = router.pathname === '/accomodations';
  const { rooms, currency, nearBy, lat, lon } = router.query;
  const initialRooms = isAccomodations ? rooms : 1;
  const initialCurrency = isAccomodations ? currency : 'UAH';
  const initialNearBy = isAccomodations ? nearBy : ''
  const initialMinDate = isAccomodations ? Date.parse(router.query.checkIn) : Date.now();
  const initialMaxDate = isAccomodations ? Date.parse(router.query.checkOut) : Date.now() +  86400000;
  console.log(initialMaxDate, initialMinDate, initialNearBy, initialCurrency, initialRooms, lat, lon)
  return {
    initialMaxDate, initialMinDate, initialNearBy, initialCurrency, initialRooms, lat, lon
  }
}

