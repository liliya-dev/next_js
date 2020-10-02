import classes from './OptionsList.module.scss';

interface Props {
    optionsList: string[];
    currentOption: string;
    selectedList: string[];
    optionName: string;
    handleChangeSelectedList: (value: string, option: string, action: string) => (void);
}

export const OptionsList: React.FC<Props> = ({ 
    optionsList, currentOption, optionName, selectedList, handleChangeSelectedList
}) => {
    return (
        <ul className={classes.select}>
            {
                optionsList
                    .filter(option => option !== currentOption)
                    .map(option => (
                    <li
                        className={classes.select__item}
                        key={'list' + option}
                    >
                        <input 
                            type="checkbox"
                            className={classes.checkbox}
                            checked={selectedList.includes(option)}
                            onChange={() => {
                                selectedList.includes(option)
                                ? handleChangeSelectedList(option, optionName, 'delete')
                                : handleChangeSelectedList(option, optionName, 'add')
                            }}
                        />
                        <p>{option}</p>
                    </li>
                ))
            }
        </ul>
    )
}