import React, { useState, useEffect, useContext, useCallback, Fragment } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';

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
    const [cardList, setCardList] = useState([])
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
                    var presetList = Object.keys(presetObject);
                    if (presetObject){
                        presetList.map(preset => (
                            tempPreset.push(presetObject[preset])
                        ))
                    } else {
                        const initCardList = [
                            {
                                id: 1,
                                cardid: 1,
                                level: 1,
                            },
                            {
                                id: 2,
                                cardid: 1,
                                level: 1,
                            },
                            {
                                id: 3,
                                cardid: 1,
                                level: 1,
                            },
                            {
                                id: 4,
                                cardid: 1,
                                level: 1,
                            },
                            {
                                id: 5,
                                cardid: 1,
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
                    setPresetList(presetList);
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
        linkDB()
    }, [linkDB])

    return(
        <Fragment>
            {currentUser?
                <div className="content type_card">
                    <div className="set_area">
                        <div className="user_info_wrap">
                            <div className="name">{userAgentName}</div>
                            <div className="preset_wrap">
                                <select name="preset_list">                            
                                    {
                                        presetList.map((preset,index) => (
                                            <option key={index}>{preset}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <ul className="card_list">
                            <li className="card_wrap">
                                <span role="button" className="card_btn">
                                    <span></span>
                                </span>
                            </li>
                            <li className="card_wrap">
                                <span role="button" className="card_btn">
                                    
                                </span>
                            </li>
                            <li className="card_wrap">
                                <span role="button" className="card_btn">
                                    
                                </span>
                            </li>
                            <li className="card_wrap">
                                <span role="button" className="card_btn">
                                    
                                </span>
                            </li>
                            <li className="card_wrap">
                                <span role="button" className="card_btn">
                                    
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                //비로그인
                : <div>로그인해주세요</div>
            }
        </Fragment>        
    )
}

export default Card;