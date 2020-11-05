import classes from './ChangeButton.module.scss';
import changeImg from './images/change.png';

export const ChangeButton = ({ changeCities }) => {
  return (
    <button 
      onClick={changeCities}
      className={classes.button} 
      type="button"
    >
      <img className={classes.img} src={changeImg} alt=""/>
    </button>
  )
}