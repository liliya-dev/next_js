import classes from './Counter.module.scss';

interface Props {
  roomsNumber: number,
  setRomsNumber: (value: number) => void
}

export const Counter: React.FC<Props> = ({ roomsNumber, setRomsNumber }) => {
  const passValueToSetRoomsNumber = (value: number) => {
    if (value < 1) {
      setRomsNumber(1);
    } else {
      setRomsNumber(value);
    }
  }
  return (
    <div className={classes.container}>
      <p className={classes.text}>Rooms:</p>
      <div className={classes.wrapper}>
      <button 
        className={classes.button} 
        onClick={() => passValueToSetRoomsNumber(roomsNumber - 1)} 
        type="button"
      >
        -
      </button>
      <div className={classes.value}>{roomsNumber}</div>
      <button 
        className={classes.button} 
        onClick={() => passValueToSetRoomsNumber(roomsNumber + 1)} 
        type="button"
      >
        +
      </button>
      </div>
    </div>
  )
}