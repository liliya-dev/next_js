import classes from './SearchButton.module.scss';
import Loader from 'react-loader-spinner';

interface Props {
  isLoading: boolean,
  handleClick: () => void,
  title: string
}

export const SearchButton: React.FC<Props> = ({ handleClick, isLoading, title }) => {
  return (
    <button className={classes.button} onClick={handleClick} disabled={isLoading}>
    { isLoading ? 
    ( <div className={classes.loadingButton}>
        Loading
        <Loader
          type="Audio"
          color="white"
          height={15}
          width={15}
          timeout={3000}
          className={classes.spinner}
        />
      </div> )
      : <p>{title}</p>
    }
  </button>
  )
}