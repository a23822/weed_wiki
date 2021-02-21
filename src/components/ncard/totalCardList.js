import React, { Fragment } from 'react';
import Flicking from "@egjs/react-flicking";

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

const totalCardList = (props) => {
    const cardList = props.cardlistdata;
    const getCardIndex = props.getdetailcardindex;
    const getIsShowDetail = props.getisshowdetail;

    const onClickCard = (index) => {
        getCardIndex(index);
        getIsShowDetail(true);
    }

    return (
        <Fragment>
            <Flicking className={`flicking ${styles.item_list_wrap}`} gap={12} autoResize={true} anchor={"50%"} hanger={"50%"} circular={true}>
                {
                    cardList.map(card => (
                        card.display?
                        <div key={card.id} className={styles.item_bx}>
                            <button onClick={() => onClickCard(card.id)} className={styles.item} style={{backgroundColor:`${card.bgInfo.bgColor}`,color:`${card.bgInfo.fontColor}`}}>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={`spcard img_card${card.id}`}></i>
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