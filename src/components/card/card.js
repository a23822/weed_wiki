import React, { useState, useEffect, useContext, useCallback, Fragment } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import DetailInfo from './detail';


const Card = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);
    //회원정보
    const [userAgentName, setUserAgentName] = useState('');
    //프리셋리스트
    const [presetList,  setPresetList] = useState([]);
    //프리셋
    const [shownPresets, setShownPreset] = useState([]);
    const [presetIndex, setPresetIndex] = useState(0);
    //카드리스트
    const [cardList, setCardList] = useState([
        {
            id: 1,
            cardId: 1,
            level: 1,
        },
        {
            id: 2,
            cardId: 1,
            level: 1,
        },
        {
            id: 3,
            cardId: 1,
            level: 1,
        },
        {
            id: 4,
            cardId: 1,
            level: 1,
        },
        {
            id: 5,
            cardId: 1,
            level: 1,
        },
    ])
    //카드작수치
    const [cardValue, setCardValue] = useState({});
    //정보 불러오기
    const linkDB = useCallback(() => {
        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userRef = firebaseApp.database().ref('users/' + user.uid)
                userRef.once('value').then(function(snapshot) {
                    setUserAgentName(snapshot.child('agentName').val());
                    var presetObject = snapshot.child('cardSet').val();
                    var tempPreset = [];
                    if (presetObject){
                        var presetList = Object.keys(presetObject);
                        presetList.map(preset => (
                            tempPreset.push(presetObject[preset])
                        ))
                        setPresetList(presetList);
                    } else {
                        const initCardList = [
                            {
                                id: 1,
                                cardId: 1,
                                level: 1,
                            },
                            {
                                id: 2,
                                cardId: 1,
                                level: 1,
                            },
                            {
                                id: 3,
                                cardId: 1,
                                level: 1,
                            },
                            {
                                id: 4,
                                cardId: 1,
                                level: 1,
                            },
                            {
                                id: 5,
                                cardId: 1,
                                level: 1,
                            },
                        ];
                        const initCardValue = {
                            "모공" : 0,
                            "물공" : 0,
                            "에공" : 0,
                            "생명" : 0,
                            "공속" : 0,
                            "방무" : 0,
                            "쿨감" : 0,
                            "치율" : 0,
                            "치피" : 0,
                            "회피" : 0,
                            "발동" : [],
                        };
                        var newCardSet = firebaseApp.database().ref('users/' + user.uid + '/cardSet/');
                        newCardSet.set({
                            "preset1" : {
                                            'id': 1,
                                            'list': initCardList,
                                            'value': initCardValue,
                                        }
                            },
                        )
                    }
                    setShownPreset(tempPreset[presetIndex]);
                })
            }
            else {
                console.log("no logged in")
            }
        })
    }, [presetIndex])
    

    //TODO useEffect 로 둘러싸게 바뀌었는데 오류없을 시 보존 아니면 롤백
    useEffect(()=>{
        linkDB();
    }, [linkDB])

    // 프리셋 선택
    const onSelectPreset = (e) => {
        var target = e.target;
        var preset_btns = e.target.parentNode.parentNode.getElementsByClassName('preset_btn');
        setPresetIndex(Array.prototype.indexOf.call(preset_btns, target));
    }

    //카드정보 불러오기
    const loadCardInfo = (index) => {
        console.log(`${index} + 1`);
        return(
            <Fragment>
                <div className="no-event">카드이름</div>
            </Fragment>
        )
    }

    // 카드 클릭 시
    const [viewCardIndex, setViewCardIndex] = useState(0);
    const card_detail_layer = document.getElementById('card_detail_layer');
    const onClickCardItem = (e) => {
        setViewCardIndex(parseInt(e.target.getAttribute('data-index')));
        card_detail_layer.classList.add('show');
    }
    console.log(`프리셋은 ${presetList} 이고 카드는 ${viewCardIndex}`);
    // 버튼 hover 처리
    const [btn_hovered, setBtnHover] = useState(false);
    const onHoverOver = (e) => {
        setBtnHover(true);
    }

    const onHoverOut = () => {
        setBtnHover(false);
    }
        //닫기버튼
    const onClickCloseBtn = (e) => {
        e.preventDefault();
        card_detail_layer.classList.remove('show');
    }

    return(
        <Fragment>
            {currentUser?
                <div className="content type_card">
                    <div className="set_area">
                        <div className="user_info_wrap">
                            <div className="name">{userAgentName}</div>
                            <div className="preset_wrap">
                                <ul className="preset_list">
                                    {
                                        presetList.map((preset,index) => (
                                            <li key={index} className="item_wrap">
                                                {index == presetIndex?
                                                <button type="button" aria-selected="true" onClick={onSelectPreset} className="preset_btn">
                                                    {preset}
                                                </button>
                                                :<button type="button" aria-selected="false" onClick={onSelectPreset} className="preset_btn">
                                                    {preset}
                                                </button>
                                                }
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="card_list_wrap">
                            <ul className="card_list">
                                {
                                    cardList.map((card,index) => (
                                        <li key={index} className="card_wrap">
                                            <button type="button" data-index={card.id} onClick={onClickCardItem} className="spcard card_default card_btn">
                                                {loadCardInfo(card.cardId)}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/* 카드레이어 */}
                    <div id="card_detail_layer" className="card_datail_layer">
                        <button type="button"
                        onClick={onClickCloseBtn} onMouseEnter={onHoverOver} onMouseLeave={onHoverOut}
                        className={'close_btn'}>
                            {btn_hovered?<IoIosCloseCircle fill="#fff"/>:<IoIosCloseCircleOutline fill="#fff"/>}
                        </button>
                        <DetailInfo viewCardIndex={viewCardIndex} presetIndex={presetIndex}/>
                    </div>
                </div>
                //비로그인
                : <div>로그인해주세요</div>
            }
        </Fragment>        
    )
}

export default Card;