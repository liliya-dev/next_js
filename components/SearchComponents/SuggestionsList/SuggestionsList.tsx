import classes from './SuggestionsList.module.scss';
import Loader from 'react-loader-spinner';
import { Suggestion } from '../inteface'; 

interface Props {
  suggestions: Suggestion[],
  handleSelect: (suggestion: Suggestion) => (void);
  isVisible: boolean,
  isError: boolean,
  isLoading: boolean
}

const LOADER_COLOR = "rgba(17, 18, 54, 0.8)";
const SUGGESTION_COLOR = "rgba(17, 18, 54, 0.3)";

export const SuggestionsList: React.FC<Props> = ({ 
  suggestions, handleSelect, isVisible, isError, isLoading
}) => {

  function createMarkup(value) {
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
            color={LOADER_COLOR}
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
                style={{ 'color' : SUGGESTION_COLOR }} 
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
          <ul className={classes.list}>
            {content()}
          </ul>  
        )
      }
    </div>
  )
}