import React, { useState, useEffect, useContext, useCallback } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import classNames from 'classnames';
import Flicking from "@egjs/react-flicking";
import cardData from '../../json/card.json';
import TotalCardList from './totalCardList';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

// icon
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";

const Card = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);

    //카드정보 불러오기
    const [cardInfoList, getCardInfoList] = useState([]);

    useEffect(() => {
        getCardInfoList(cardData["cards"]);
    }, []);

    // 필터 버튼 클릭 시
    const [filterState, setFilterState] = useState([
        {
            "id" : 1,
            "name" : "프카만",
            "state" : false
        },
        {
            "id": 2,
            "name" : "컬렉션작용",
            "state" : false
        }
    ])

    // 필터
    const onClickFilterBtn = (index) => {
        setFilterState(
            filterState.map(filter => 
                filter.id === index ? {...filter, "state" : !filter.state} : filter
            )
        );
        const premiumFlag = filterState[0].state;
        const collectionFlag = filterState[1].state;
        if (index === 1) {
            if (premiumFlag) {
                // 프카만 보기 해제
                if (collectionFlag) {
                    //컬렉션용 보기 ON
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.hasCollection === true?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                } else {
                    //컬렉션용 보기 OFF
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.display === false?{...card,"display":true}: card
                        )
                    )
                }
            } else {
                //프카만 보기
                if (collectionFlag) {
                    //컬렉션용 보기 ON
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.rank === "premium" && card.hasCollection === true?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                } else {
                    //컬렉션용 보기 OFF
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.rank === "premium"?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                }
            }
        }
        else if (index === 2) {
            if (collectionFlag) {
                //컬렉션용 보기 해제
                if (premiumFlag) {
                    //프카만 보기 ON
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.rank === "premium"?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                } else {
                    //프카만 보기 OFF
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.display === false?{...card,"display":true}: card
                        )
                    )
                }
            } else {
                //컬렉션용 보기
                if (premiumFlag) {
                    //프카만 보기 ON
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.rank === "premium" && card.hasCollection === true?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                } else {
                    //프카만 보기 OFF
                    getCardInfoList(
                        cardInfoList.map(card =>
                            card.hasCollection === true?{...card,"display":true}:{...card,"display":false}
                        )
                    )
                }
            }
        }
    }
    
    return (
        <section className={`sc ${styles.sc}`}>
            <div className="sc_title_area">
                <h2 className="title">코믹스 카드</h2>
            </div>
            <div className={styles.filter_wrap}>
                <div className={"scroll_area"}>
                    <div className={"scroll_wrap"}>
                        <div className={"scroll_inner"}>
                            {
                                filterState.map(filter => (
                                    <div key={filter.id} className={"item_bx"}>
                                        <button onClick={() => onClickFilterBtn(filter.id)} className={styles.btn_filter} aria-pressed={filter.state}>
                                            <RiCheckboxBlankCircleLine className={styles.ico}/>
                                            <RiCheckboxCircleFill className={`${styles.ico} ${styles.type_selected}`}/>
                                            {filter.name}
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <TotalCardList cardlistdata={cardInfoList}/>
        </section>
    )
}

export default Card;