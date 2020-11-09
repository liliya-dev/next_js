const baseURL = 'https://rapidapi.p.rapidapi.com/';

export const getHotels = async (checkIn, checkOut, lat, lon) => {
  const response = await fetch(`${baseURL}srle/listing/v1/brands/hotels.com?checkIn=${checkIn}&checkOut=${checkOut}&lat=${lat}&lon=${lon}&locale=en_US&rooms=1&currency=USD&pageNumber=1`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
      "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
    }
  })

  const data = await response.json();
  console.log(data.data.body.searchResults)
  
  return data.data.body.searchResults;
}