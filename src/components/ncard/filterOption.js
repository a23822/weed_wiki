import React, { Fragment } from 'react';

// scss
import styles from './card.module.scss';

const filterOption = (props) => {
    const options = props.filteroptionprops.filteredOptionList;
    const setFilteredOptionList = props.filteroptionprops.setFilteredOptionList;
    const isShowFilterOptionList = props.filteroptionprops.isShowFilterOptionList;
    const setIsShowFilterOptionList = props.filteroptionprops.setIsShowFilterOptionList;

    const onClickRadio = (id) => {
        setFilteredOptionList(options.map(option => 
            option.id === id?{...option, "state": !option.state}:option
        ))
    }

    console.log('asd');
    console.log(options);

    return (
        <Fragment>
            {
                isShowFilterOptionList?
                <div className={'ly_info'}>
                    <div className={styles.option_wrap}>
                        <h3 className={styles.title}>필터옵션</h3>
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

export default filterOption;