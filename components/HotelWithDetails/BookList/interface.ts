export interface Room  {
  additionalInfo: {
    description: string,
    details: {
      amenities: string[]
    }
  },
  bedChoices: {
    mainOptions: string[]
  },
  images: {
    caption: string,
    fullSizeUrl: string,
    thumbnailUrl: string
  }[],
  maxOccupancy: {
    children: number,
    messageChildren: string,
    messageTotal: string,
    total: number
  }, 
  name: string,
  ratePlans: {
    cancellation: {
      additionalInfo: string,
      cancellationDate: string,
      free: boolean,
      info: string,
      refaundable: boolean,
      title: string
    },
    features: {
      featureType: string,
      title: string
    }[],
    occupancy: {
      maxAdults: number,
      maxChildren: number
    },
    offers: {
      offer: {
        promoType: string,
        text: string
      },
      valueAdds: []
    },
    price: {
      current: string, 
      old: string,
      unformattedCurrent: number,
      totalPricePerStay: string,
      priceBreakdown?: {
        lineItems: {
          label: string,
          price: string
        }[],
        total: {
          label: string,
          price: string
        }
      }
    },
    welcomeRewards: {
      info: string
    }
  }[]
}
