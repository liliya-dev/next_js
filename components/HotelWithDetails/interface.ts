export interface Hotel {
  body: {
    amenities: {
      heading: string,
      listItems: {
        heading: string,
        listItems: string[]
      }[]
    }[],
    atAGlance: {
      keyFacts: {
        arrivingLeaving: string[],
        hotelSize: string[],
        requiredAtCheckIn: string[],
        specialCheckInInstructions: string[],
      },
      transportAndOther: {
        otherInclusions: string[],
        otherInformation: string[],
        transport: {
          offsiteTransfer: string[],
          parking: string[],
          transfers: string[]
        }
      },
      travellingOrInternet: {
        internet: string[],
        travelling: {
          children: string[],
          extraPeople: string[],
          pets: string[]
        }
      }
    },
    guestReviews: {
      brands: {
        badgeText: string,
        formattedRating: string,
        formattedScale: string,
        rating: string,
        scale: string,
        total: string
      },
      trustYouReviews: {
        categoryName: string,
        percentage: string,
        text: string
      }[]
    },
    hotelWelcomeRewards: {
      applies: boolean,
      info: string
    },
    overview: {
      overviewSections: {
        content: string[],
        title: string,
        type: string
      }[]
    },
    pdpHeader: {
      currencyCode: string,
      destinationId: string,
      hotelId: string,
      hotelLocation: {
        coordinates: {
          latitude: number,
          longitude: number
        },
        locationName: string
      }
    },
    propertyDescription: {
      address: {
        addressLine1: string,
        cityName: string,
        countryCode: string,
        countryName: string,
        fullAddress: string,
        postalCode: string
      },
      featuredPrice: {
        bookNowButton: boolean,
        currentPrice: {
          formatted: string,
          plain: number,
        },
        offer: {
          label: string,
          promoType: string,
          text: string
        },
        oldPrice: string,
        taxInclusiveFormatting: boolean
      },
      freebies: string[],
      mapWidget: {
        staticMapUrl: string
      },
      name: string,
      roomTypeNames: string[],
      starRating: string,
      starRatingTitle: string
    },
    roomsAndRates: {
      priceColumnHeading: string,
      ratePlanWithOffersExists: boolean,
      rooms: {
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
            totalPricePerStay: string,
            current: string, 
            old: string,
            unformattedCurrent: number,
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
      }[]
    },
  }
}