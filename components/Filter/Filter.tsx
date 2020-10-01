import classes from "./Filter.module.scss";
import { DebounceInput } from 'react-debounce-input';

interface Props {
    value: string;
    setValue: (value: string) => (void);
    makeApiCall: () => (void);
}

export const Filter: React.FC<Props> = ({ value, setValue, makeApiCall }) => {

    return (
        <>
            <DebounceInput
                minLength={2}
                debounceTimeout={2000}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className={classes.input}
                type="text"
            />
            <button 
                type="button"
                onClick={makeApiCall}
            >
                Search
            </button>
        </>
    )
}