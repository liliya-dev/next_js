import { useState } from 'react';
import { SelectInput } from '../SelectInput/SelectInput';
import classes from './FlightInfo.module.scss';

export const FlightInfo = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={classes.container}>
      <p className={classes.text}>{text}</p>
      <input 
        onClick={() => setIsVisible(true)}
        className={classes.input} 
        readOnly={true} 
        type="text"
      />
      {
        isVisible && (
          <div className={classes.flightInfo}>
            <p>Cabin Class</p>
            <SelectInput />
            <p>Adults</p>
          </div>
        )
      }
    </div>
  )
}