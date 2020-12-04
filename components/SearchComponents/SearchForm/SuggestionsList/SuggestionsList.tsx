import classes from './SuggestionsList.module.scss';
import Loader from 'react-loader-spinner';

interface Suggestion {
  geoId: string,
  destinationId: string,
  landmarkCityDestinationId: string,
  type: string,
  caption: any,
  redirectPage: string,
  latitude: number,
  longitude: number,
  name: string,
}

interface Props {
  suggestions: Suggestion[],
  handleSelect: (suggestion: Suggestion) => (void);
  isVisible: boolean,
  isError: boolean,
  isLoading: boolean,
}

export const SuggestionsList: React.FC<Props> = ({ 
  suggestions, handleSelect, isVisible, isError, isLoading
}) => {

  const createMarkup = (value) => {
    return {__html: value};
  }

  const content = () => {
    if (isError) {
      return <p>Error occured</p>
    } else if (isLoading) {
      return (
        <>
          <Loader
            type="Audio"
            color="rgba(17, 18, 54, 0.8)"
            height={100}
            width={100}
            timeout={3000}
            className={classes.spinner}
          />
          {
              suggestions && isVisible && suggestions.map(suggestion => (
                <li 
                  key={suggestion.geoId}
                  className={classes.item}
                  style={{'color' : 'rgba(17, 18, 54, 0.2)'}} 
                  dangerouslySetInnerHTML={createMarkup(suggestion.caption)}
                >
                </li>
              ))
            }
        </>
      )
    } else if (isVisible && suggestions.length) {
      return (
        <>
            {
              suggestions && isVisible && suggestions.map(suggestion => (
                <li 
                  key={suggestion.geoId}
                  className={classes.item} 
                  onClick={() => handleSelect(suggestion)}
                  dangerouslySetInnerHTML={createMarkup(suggestion.caption)}
                >
                </li>
              ))
            }
          </>  
      )
    } else if (!suggestions.length) {
      return <p className={classes.text}>Nothing was found, please try to change your request</p>
    }
  }

  return (
    <div className={classes.container}>
      {
        isVisible && (
          <ul className={`${classes.list} fs-12`}>
            {content()}
          </ul>  
        )
      }
    </div>
  )
}