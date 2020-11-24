export interface searchResult {
  id: number,
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
  },
  coordinate: {
    lat: number,
    lon: number
  },
  neighbourhood: string,
  ratePlan: {
    features: {
      freeCancellation: boolean,
      noCCRequired: boolean,
      paymentPreference: boolean
    },
    price: {
      current: string,
      exactCurrent: number,
      old: string
    }
  }
  starRating: number,
  supplierHotelId: number,
  name: string,
  thumbnailUrl: string,
}