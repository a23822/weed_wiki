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

    // console.log(cardInfoList);

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

    const onClickFilterBtn = (index) => {
        setFilterState(
            filterState.map(filter => 
                filter.id === index ? {...filter, "state" : !filter.state} : filter
            )
        )
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
            <TotalCardList cardlistdata={cardInfoList} filterlistdata={filterState}/>
        </section>
    )
}

export default Card;