export const getReviews = async (id, page) => {
  try {
    const response = await fetch(`https://hotels-com-free.p.rapidapi.com/mobile_service/property-content/v1/hotels.com/property/${id}/reviews?loc=en_US&page=${page}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "e99f359a1bmsh2ac75c186a93832p12e282jsn579a9b55eb2e",
        "x-rapidapi-host": "hotels-com-free.p.rapidapi.com"
      }
    })
  
    const data = await response.json();
    
    return data
  }

  catch(error) {
    return new Error
  }
}