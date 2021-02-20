import React, { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import Flicking from "@egjs/react-flicking";

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

const totalCardList = (props) => {
    const cardList = props.cardlistdata;
    const filterList = props.filterlistdata;

    return (
        <Fragment>
            <Flicking className={`flicking ${styles.item_list_wrap}`} gap={12} autoResize={true} anchor={"50%"} hanger={"50%"} circular={true}>
                {
                    cardList.map(card => (
                        card.display?
                        <div key={card.id} className={styles.item_bx}>
                            <button className={styles.item} style={{backgroundColor:`${card.bgInfo.bgColor}`,color:`${card.bgInfo.fontColor}`}}>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={classNames('spcard','img_card'+card.id)}></i>
                                    </div>
                                    <div className={styles.name}>{card.name}</div>
                                </div>
                            </button>
                        </div>
                        :
                        null
                    ))
                }
            </Flicking>
        </Fragment>
    )
}


export default totalCardList;