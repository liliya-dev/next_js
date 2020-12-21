import classes from './SearchButton.module.scss';
import Loader from 'react-loader-spinner';

interface Props {
  isLoading: boolean,
  handleClick: () => void,
  title: string,
  isLoadingFromParent?: boolean
}

export const SearchButton: React.FC<Props> = ({ handleClick, isLoading, title, isLoadingFromParent=false }) => {
  return (
    <button className={classes.button} onClick={handleClick} disabled={isLoading}>
    { (isLoading || isLoadingFromParent) 
    ? 
      ( 
        <div className={classes.loadingButton}>
          {title}
          <Loader
            type="Audio"
            color="white"
            height={15}
            width={15}
            timeout={0}
            className={classes.spinner}
          />
        </div> 
      )
      : <p>{title}</p>
    }
  </button>
  )
}