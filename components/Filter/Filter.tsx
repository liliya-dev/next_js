import classes from "./Filter.module.scss"

interface Props {
    value: string;
    setValue: (value: string) => (void);
}

export const Filter: React.FC<Props> = ({ value, setValue }) => {
    return (
        <>
            <input 
                className={classes.input}
                type="text"
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
            />
            <button type="button">Search</button>
        </>
    )
}