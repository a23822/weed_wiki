import React, { useState, useEffect, useContext, Fragment } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';

const Card = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);
    //회원정보
    const [userAgentName, setUserAgentName] = useState('');
    //카드리스트
    const [cardList, setCardList] = useState([
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
    ])
    //카드작수치
    const [cardValue, setCardValue] = useState([
        {
            id: 1,
            name: '모공',
            value: 0,
        },
        {
            id: 2,
            name: '물공',
            value: 0,
        },
        {
            id: 3,
            name: '에공',
            value: 0,
        },
        {
            id: 4,
            name: '생명',
            value: 0,
        },
        {
            id: 5,
            name: '공속',
            value: 0,
        },
        {
            id: 6,
            name: '방무',
            value: 0,
        },
        {
            id: 7,
            name: '쿨감',
            value: 0,
        },
        {
            id: 8,
            name: '치율',
            value: 0,
        },
        {
            id: 9,
            name: '치피',
            value: 0,
        },
        {
            id: 10,
            name: '회피',
            value: 0,
        },
        {
            id: 11,
            name: '발동',
            value: '없음',
        }
    ])

    

    //TODO useEffect 로 둘러싸게 바뀌었는데 오류없을 시 보존 아니면 롤백
    useEffect(()=>{
        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userRef = firebaseApp.database().ref('users/' + user.uid)
                userRef.once('value').then(function(snapshot) {
                    setUserAgentName(snapshot.child('agentName').val());
                    console.log(snapshot.child('cardSet'));
                    if (snapshot.child('cardSet').val()){
                        console.log('asdasd')
                    } else {
                        var newCardSet = firebaseApp.database().ref('users/' + user.uid + '/cardSet/');
                        newCardSet.set({
                            'preset1':
                                {
                                    'id': 1,
                                    'list': cardList,
                                    'value': cardValue,
                                },
                            })
                    }
                })
            }
            else {
                console.log("no logged in")
            }
        })
    }, [currentUser])


    return(
        <Fragment>
            {currentUser?
                <div className="content type_card">
                    <div className="set_area">
                        <div className="user_info_wrap">
                            <div className="name">{{userAgentName}}님 카드작입니다.</div>
                            <div className="preset_wrap">
                                <select name="preset_list">
                                    
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