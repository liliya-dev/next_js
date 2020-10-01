import { useEffect, useState } from "react";
import classes from './Select.module.scss';

interface Props {
    currentOption: string;
    optionsList: string[];
    optionName: string;
    handleChangeSelectOption: (value: string, option: string) => (void);
}

export const Select: React.FC<Props> = ({ 
    currentOption, optionsList, optionName, handleChangeSelectOption 
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = (ev) => {
        if(ev.target.classList[0] !== classes.select__item) {
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
                        <ul className={classes.select}>
                            {
                                optionsList
                                    .filter(option => option !== currentOption)
                                    .map(option => (
                                    <li
                                        className={classes.select__item}
                                        onClick={() => {
                                            handleChangeSelectOption(option, optionName);
                                            setIsVisible(false);
                                        }}
                                    >
                                        - {option}
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}