import { useEffect, useState } from "react";
import classes from './Select.module.scss';
import { SelectedList } from './SelectedList/SelectedList';
import { OptionsList } from './OptionsList/OPtionsList';

interface Props {
    selectedList: string[];
    currentOption: string;
    optionsList: string[];
    optionName: string;
    handleChangeSelectedList: (value: string, option: string, action: string) => (void);
}

export const Select: React.FC<Props> = ({ 
    currentOption, optionsList, optionName, handleChangeSelectedList, 
    selectedList
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = (ev) => {
        if (!ev.target.closest(`.${classes.container}`)) {
            setIsVisible(false)
        }
    };
    useEffect(() => {
        document.addEventListener('click', toggleVisibility)
        return function cleanup() {
            document.removeEventListener('click', toggleVisibility)
        }
    }, []);

    return (
        <div className={classes.container}>
            <h5 className={classes.title}>{optionName}:</h5>
           <SelectedList 
                selectedList={selectedList} 
                handleChangeSelectedList={handleChangeSelectedList}
                optionName={optionName}
            />
            <div className={classes.wrapper}>
                <div  
                    className={
                        isVisible 
                            ? `${classes.select__item} ${classes.button_checked}` 
                            : `${classes.select__item} ${classes.button_nonChecked}`
                    }
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {currentOption}	
                </div>  
                {
                    isVisible && (
                        <OptionsList 
                            optionName={optionName}
                            currentOption={currentOption}
                            optionsList={optionsList}
                            selectedList={selectedList}
                            handleChangeSelectedList={handleChangeSelectedList}
                        />
                    )
                }
            </div>
        </div>
    )
}