import React, { useState, useEffect, useContext, useCallback } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import cardData from '../../json/card.json';

// component
import TotalCardList from './totalCardList';
import CardDetail from './cardDetail';

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
        },
        {
            "id": 3,
            "name": "모공,생명,물/에공 올인원",
            "state": false,
        }
    ])

    const preAllinOneFilterFlag = (count) => {
        if (count >=4 ) {
            return true
        } else {
            return false
        }
    }

    const preAllinOneFilter = async(card) => {
        let filterCount = 0;
        const optionList = [card.option1, card.option2, card.option3, card.option4, card.option5, card.option6];
        for (var i=0;i<optionList.length;i++) {
            for (var j=0;j<optionList[i].length;j++) {
                if (optionList[i][j]=='물공'||optionList[i][j]=='생명'||optionList[i][j]=='에공'||optionList[i][j]=='모공') {
                    filterCount += 1;
                    break;
                }
            }
            if (filterCount>=4) {
                break;
            }
        }
        const res = await preAllinOneFilterFlag(filterCount);
        return res;
    }

    useEffect(() => {
        const trueFilterList = [];
        filterState.map(filter =>
            filter.state?trueFilterList.push(filter.id):null
        )

        const filterPremium = (list) => {
            if (trueFilterList.includes(1)) {
                var res = list.map(card => !card.display && card.rank==="Premium"?{...card, display: false}:{...card, display: true});
                return res
            } else {
                return list
            }
        }

        const filterCollection = (list) => {
            if (trueFilterList.includes(2)) {
                var res = list.map(card => !card.display && card.collectionInfo.hasCollection?{...card, display: false}:{...card, display: true});
                return res
            } else {
                return list
            }
        }

        const filterAllinOne = async(list) => {
            if (trueFilterList.includes(3)) {
                var res = list.map(card => !card.display && card.hasAllinOne?{...card, display: false}:{...card, display: true});
                return res
            } else {
                return list
            }
        }

        const filterReverseList = (list) => {
            var res = list.map(card => card.display?{...card, display: !card.display}:{...card, display: !card.display});
            return res
        }

        const makeTempCardList = (list) => {
            var res = list.map(card => card.display?{...card, display: false}:card);
            return res
        }

        const doFiltering = async() => {
            let temp = makeTempCardList(cardData["cards"]);
            let false_p_filter = await filterPremium(temp);
            let false_c_filter = await filterCollection(false_p_filter);
            let false_aio_filter = await filterAllinOne(false_c_filter);
            let reverse = await filterReverseList(false_aio_filter);
            return getCardInfoList(reverse);
        }

        if (trueFilterList.length === 0) {
            getCardInfoList(cardData["cards"]);
        } else {
            doFiltering();
        }
    },[filterState])

    // 필터
    const onClickFilterBtn = async(index) => {
        setFilterState(
            filterState.map(filter => 
                filter.id === index ? {...filter, "state" : !filter.state} : filter
            )
        );
    }

    // 카드 상세정보 보기
    const [detailCardIndex, getDetailCardIndex] = useState(0);
    const [isShowDetail, getIsShowDetail] = useState(false);
    const [isPressedLabelInfoBtn, setIsPressedLabelInfoBtn] = useState(false);

    // props 정리
    const detailProps = {
        "cardIndex" : detailCardIndex,
        "cardInfoList" : cardInfoList,
        "isShowDetail" : isShowDetail,
        "getIsShowDetail" : getIsShowDetail,
        "isPressedLabelInfoBtn" : isPressedLabelInfoBtn,
        "setIsPressedLabelInfoBtn" : setIsPressedLabelInfoBtn
    }
    
    return (
        <section className={`sc`}>
            <div className={`sc_title_area`}>
                <h2 className={`title`}>코믹스 카드</h2>
            </div>
            <div className={styles.filter_wrap}>
                <div className={`scroll_area`}>
                    <div className={`scroll_wrap`}>
                        <div className={`scroll_inner`}>
                            {
                                filterState.map(filter => (
                                    <div key={filter.id} className={`item_bx`}>
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
            <TotalCardList cardlistdata={cardInfoList} getdetailcardindex={getDetailCardIndex} getisshowdetail={getIsShowDetail}/>
            <CardDetail detailprops={detailProps}/>
        </section>
    )
}

export default Card;