import React, { useState, useEffect, useContext, useCallback } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import classNames from 'classnames';
import Flicking from "@egjs/react-flicking";
import cardData from '../../json/card.json';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

const Card = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);

    //카드정보 불러오기
    const [cardInfoList, getCardInfoList] = useState([]);

    useEffect(() => {
        getCardInfoList(cardData["cards"]);
    }, []);

    console.log(cardInfoList);
    
    return(
        <section className={`sc ${styles.sc}`}>
            <Flicking className={`flicking ${styles.item_list_wrap}`} gap={12} autoResize={true} anchor={"50%"} hanger={"50%"} circular={true}>
                {
                    cardInfoList.map(card => (
                        <div key={card.id} className={styles.item_bx}>
                            <button className={styles.item} style={{backgroundColor:`${card.bgInfo.bgColor}`,color:`${card.bgInfo.fontColor}`}}>
                                <div className={styles.thumb_area}>
                                    <div className={styles.thumb_wrap}>
                                        <i className={classNames('spcard','img_card'+card.id)}></i>
                                    </div>
                                    <div className={styles.name}>{card.name}</div>
                                </div>
                                <div className={"info_area"}>

                                </div>
                            </button>
                        </div>
                    ))
                }
            </Flicking>
        </section>
    )
}

export default Card;