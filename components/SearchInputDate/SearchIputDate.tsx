import { useState } from "react";
import classes from './SearchInputDate.module.scss';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export const SearchIputDate = ({ text, initialDate, updateDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(initialDate));

  const handleDateChange = (date) => {
    updateDate(Date.parse(date));
  }

  return (
    <div className={classes.container}>
      <p className={classes.text}>{text}</p>
      <DatePicker
        selected={selectedDate}
        className={classes.dateContainer}
        onChange={handleDateChange}
        dateFormat="dd.MM.yyyy"
      />
    </div>
  )
}