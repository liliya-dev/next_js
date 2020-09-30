interface Props {
    value: string;
    setValue: (value: string) => (void);
}

export const Filter: React.FC<Props> = ({ value, setValue }) => {
    return (
        <input 
            type="text"
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
        />
    )
}