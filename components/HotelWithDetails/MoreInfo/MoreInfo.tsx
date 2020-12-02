import classes from './MoreInfo.module.scss';

interface Props {
  info: {
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
  }
}

export const MoreInfo: React.FC<Props> = ({ info }) => {
  return (
    <div className={classes.container}>
      <div>
        {
          info && info.keyFacts && info.keyFacts.arrivingLeaving && (
            <div>
              <p className={`${classes.optionTitle} fs-14-italic-bold`}>Arriving details:</p>
              <ul>
                {
                  info.keyFacts.arrivingLeaving.map(option => (
                    <li>{option}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div>
        {
          info && info.keyFacts && info.keyFacts.hotelSize && (
            <div>
              <p className={`${classes.optionTitle} fs-14-italic-bold`}>Hotel details:</p>
              <ul>
                {
                  info.keyFacts.hotelSize.map(option => (
                    <li>{option}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div>
        {
          info && info.keyFacts && info.keyFacts.requiredAtCheckIn && (
            <div>
              <p className={`${classes.optionTitle} fs-14-italic-bold`}>Checkin details:</p>
              <ul>
                {
                  info.keyFacts.requiredAtCheckIn.map(option => (
                    <li>{option}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
      <div>
        {
          info && info.keyFacts && info.keyFacts.specialCheckInInstructions && (
            <div>
              <p className={`${classes.optionTitle} fs-14-italic-bold`}>Checkin instructions:</p>
              <ul>
                {
                  info.keyFacts.specialCheckInInstructions.map(option => (
                    <li>{option}</li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  )
}