import { useState } from "react";
import classes from './SelectInput.module.scss';
import Select from 'react-select';

export const SelectInput = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [value, setValue] = useState(options[0]);

  return (

    <Select
      closeOnSelect={true}
      className={classes.dropdown}
      classNamePrefix="dropdown"
      value={value} 
      options={options} 
      onChange={(value) => setValue(value)} 
      defaultValue={value}
    />
  )
}