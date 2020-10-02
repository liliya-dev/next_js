import classes from './SelectedList.module.scss';

interface Props {
    selectedList: string[];
    handleChangeSelectedList: (value: string, option: string, action: string) => (void);
    optionName: string;
}


export const SelectedList: React.FC<Props> = ({selectedList, handleChangeSelectedList, optionName}) => {
    return (
        <ul className={classes.selected}>
        {
            selectedList.map(selectedItem => (
                <li className={classes.selected__item} key={selectedItem}>
                    {selectedItem}
                    <span 
                        className={classes.button__delete}
                        onClick={() => handleChangeSelectedList(selectedItem, optionName, 'delete')}
                    >
                        X
                    </span>

                </li>
            ))
        }
    </ul>
    )
}