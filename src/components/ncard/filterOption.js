import React, { Fragment, useContext } from 'react';

// context
import { UIContext } from '../context/ui';

// scss
import styles from './card.module.scss';

// icon
import { IoIosCloseCircleOutline, IoIosCloseCircle } from "react-icons/io";

const FilterOption = (props) => {
    const options = props.filteroptionprops.filteredOptionList;
    const setFilteredOptionList = props.filteroptionprops.setFilteredOptionList;
    const isShowFilterOptionList = props.filteroptionprops.isShowFilterOptionList;
    const setIsShowFilterOptionList = props.filteroptionprops.setIsShowFilterOptionList;
    const setOnOptionFilter = props.filteroptionprops.setOnOptionFilter;

    // 스크롤
    const { ui_state, ui_actions } = useContext(UIContext);

    const onClickRadio = (id) => {
        setFilteredOptionList(options.map(option => 
            option.id === id?{...option, "state": !option.state}:option
        ))
    }

    // 닫기 버튼
    const onClickCloseBtn = () => {
        setIsShowFilterOptionList(false);
        document.body.classList.remove('no_scroll');
        window.scrollTo(0, ui_state.tempScrollValue);
    }

    // console.log('asd');
    // console.log(options);

    return (
        <Fragment>
            {
                isShowFilterOptionList?
                <div className={'ly_info'}>
                    <div className={styles.option_wrap}>
                        <h3 className={styles.title}>필터옵션</h3>
                        <button type="button" onClick={() => onClickCloseBtn()} className={styles.btn_close}>
                            <IoIosCloseCircleOutline className={`${styles.ico}`}/>
                            <IoIosCloseCircle className={`${styles.ico} ${styles.type_hover}`}/>
                        </button>
                        <div className={styles.option_area}>
                            <div className={styles.option_inner}>
                                {
                                    options.map(option => (
                                        <div key={option.id}>{option.name}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles.btn_area}>
                            <div className={styles.btn_wrap}>
                                <button type="button"></button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
            }
        </Fragment>
    )
}

export default FilterOption;