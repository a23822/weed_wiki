import React, { useState, useEffect, useContext, useCallback } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import cardData from '../../json/card.json';

// component
import TotalCardList from './totalCardList';
import CardDetail from './cardDetail';
import FilterOption from './filterOption';

// scss
import '../../sprite/card/sp_card.scss';
import styles from './card.module.scss';

// icon
import { RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { Fragment } from 'react';

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
            "state" : false,
            "filter": false
        },
        {
            "id": 2,
            "name" : "컬렉션작용",
            "state" : false,
            "filter": false
        },
        {
            "id": 3,
            "name": "모공,생명,물/에공 올인원",
            "state": false,
            "filter": false
        },
        {
            "id": 4,
            "name": "옵션 필터",
            "state": false,
            "filter": true
        }
    ])

    const [onOptionFilter, setOnOptionFilter] = useState(false);

    const [filteredOptionList, setFilteredOptionList] = useState([
        {
            "id": 1,
            "name": "모공",
            "state": false
        },
        {
            "id": 2,
            "name": "물공",
            "state": false
        },
        {
            "id": 3,
            "name": "에공",
            "state": false
        },
        {
            "id": 4,
            "name": "생명",
            "state": false
        },
        {
            "id": 5,
            "name": "공속",
            "state": false
        },
        {
            "id": 6,
            "name": "방무",
            "state": false
        },
        {
            "id": 7,
            "name": "쿨감",
            "state": false
        },
        {
            "id": 8,
            "name": "이속",
            "state": false
        },
        {
            "id": 9,
            "name": "치율",
            "state": false
        },
        {
            "id": 10,
            "name": "치피",
            "state": false
        },
        {
            "id": 11,
            "name": "모방",
            "state": false
        },
        {
            "id": 12,
            "name": "물방",
            "state": false
        },
        {
            "id": 13,
            "name": "에방",
            "state": false
        },
        {
            "id": 14,
            "name": "회복",
            "state": false
        },
        {
            "id": 15,
            "name": "상감",
            "state": false
        },
        {
            "id": 16,
            "name": "독저",
            "state": false
        },
        {
            "id": 17,
            "name": "냉저",
            "state": false
        },
        {
            "id": 18,
            "name": "화저",
            "state": false
        },
        {
            "id": 19,
            "name": "전저",
            "state": false
        },
        {
            "id": 20,
            "name": "정저",
            "state": false
        },
        {
            "id": 21,
            "name": "회피",
            "state": false
        }
    ]);

    useEffect(() => {
        const trueFilterList = [];
        filterState.map(filter =>
            filter.state?trueFilterList.push(filter.id):null
        )
        console.log(trueFilterList);

        //옵션 필터
        setOnOptionFilter(filterState[3].state);

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

        const filterAllinOne = (list) => {
            if (trueFilterList.includes(3)) {
                var res = list.map(card => !card.display && card.hasAllinOne?{...card, display: false}:{...card, display: true});
                return res
            } else {
                return list
            }
        }

        const optionFilter = (list) => {
            if (trueFilterList.includes(4)) {
                return list
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
            var temp = makeTempCardList(cardData["cards"]);
            var false_p_filter = await filterPremium(temp);
            var false_c_filter = await filterCollection(false_p_filter);
            var false_aio_filter = await filterAllinOne(false_c_filter);
            var false_option_filter = await optionFilter(false_aio_filter);
            var reverse = await filterReverseList(false_option_filter);
            return getCardInfoList(reverse);
        }

        if (trueFilterList.length === 0) {
            getCardInfoList(cardData["cards"]);
        } else {
            doFiltering();
        }
    },[filterState])

    // 필터
    const onClickFilterBtn = (index) => {
        setFilterState(
            filterState.map(filter => 
                filter.id === index ? {...filter, "state" : !filter.state} : filter
            )
        );
    }


    // 필터옵션 보기
    const [isShowFilterOptionList, setIsShowFilterOptionList] = useState(false);

    const onClickOptionFilterBtn = () => {
        setFilterState(
            filterState.map(filter => 
                filter.filter?{...filter,"state": !filter.state}:filter
            )
        );
        setOnOptionFilter(true);
        setIsShowFilterOptionList(true);
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

    const filterOptionProps = {
        "filteredOptionList": filteredOptionList,
        "setFilteredOptionList": setFilteredOptionList,
        "isShowFilterOptionList": isShowFilterOptionList,
        "setIsShowFilterOptionList": setIsShowFilterOptionList
    }
    
    return (
        <Fragment>
            <div className="aside_content">
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
                                                {
                                                    !filter.filter?
                                                    <button type="button" onClick={() => onClickFilterBtn(filter.id)} className={styles.btn_filter} aria-pressed={filter.state}>
                                                        <RiCheckboxBlankCircleLine className={styles.ico}/>
                                                        <RiCheckboxCircleFill className={`${styles.ico} ${styles.type_selected}`}/>
                                                        {filter.name}
                                                    </button>
                                                    :
                                                    <button type="button" onClick={() => onClickOptionFilterBtn()} className={styles.btn_filter} aria-pressed={onOptionFilter}>
                                                        <IoFilter className={`${styles.ico} ${styles.type_filter}`}/>
                                                        {filter.name}
                                                    </button>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <TotalCardList cardlistdata={cardInfoList} getdetailcardindex={getDetailCardIndex} getisshowdetail={getIsShowDetail}/>
                    <CardDetail detailprops={detailProps}/>
                    <FilterOption filteroptionprops={filterOptionProps}/>
                </section>
            </div>
            <div className="main_content">
                <h3>메인</h3>
            </div>
        </Fragment>
    )
}

export default Card;