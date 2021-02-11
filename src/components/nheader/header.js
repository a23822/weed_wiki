import React, { useState, useEffect, useContext, Fragment } from 'react';
import { firebaseApp, AuthContext } from '../firebase/index';
import dotenv from 'dotenv';
import Banner from '../banner/banner';

dotenv.config();

const Header = () => {
    //로그인여부
    const { currentUser } = useContext(AuthContext);

    //회원정보
    const [userAgentName, setUserAgentName] = useState('');
    const [userRank, setUserRank] = useState('');
    const [userAliance, setUserAliance] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const adminId = process.env.REACT_APP_ADMIN_ID;

    //TODO useEffect 로 둘러싸게 바뀌었는데 오류없을 시 보존 아니면 롤백
    useEffect(()=>{
        firebaseApp.auth().onAuthStateChanged(function(user) {
            if (user) {
                var userRef = firebaseApp.database().ref('users/' + user.uid)
                userRef.once('value').then(function(snapshot) {
                    setUserAgentName(snapshot.child('agentName').val());
                    setUserRank(snapshot.child('rank').val());
                    setUserAliance(snapshot.child('aliance').val());
                })
            }
            else {
                console.log("no logged in")
            }
            //admin 계정인지 아닌지
            if (user && user.uid === adminId) {
                setIsAdmin(true);
            }
        })
    }, [currentUser, adminId])

    //유저 등급 라벨
    const setUserRankLabel = (userRank) => {
        switch (userRank) {
            case '준회원':
                return (
                    <Fragment>
                        <span className="label type_cadre">준회원</span>
                    </Fragment>
                )
            case '관리자':
                return (
                    <Fragment>
                        <span className="label type_cadre">관리자</span>
                    </Fragment>
                )
            case '1급':
                return (
                    <Fragment>
                        <span className="label type_cadre">1급</span>
                    </Fragment>
                )
            case '연합장':
                return (
                    <Fragment>
                        <span className="label type_cadre">연합장</span>
                    </Fragment>
                )
            default:
                return (
                    <Fragment>
                        <span className="label type_blind"></span>
                    </Fragment>
                )
        }
    }

    //유저 연합
    const setUserAlianceLabel = (userAliance) => {
        switch (userAliance) {
            case '아르카디아 클랜':
                return (
                    <Fragment>
                        <span className="label type_arca">Arca</span>
                    </Fragment>
                )
            default:
                return (
                    <Fragment>
                        <span className="label type_blind"></span>
                    </Fragment>
                )
        }
    }
    return(
        <header className="header_wrap">
            <div className="profile_wrap">
                { currentUser?
                    <Fragment>
                        <div className="thumb_area">
                            <img src="" width="30" height="30" className="img" alt="프로필 이미지"/>
                        </div>
                        <div className="info_area">
                            <span className="info">{userAgentName}</span>
                            <div className="badge_area">
                                <span className="badge">{ setUserRankLabel(userRank) }</span>
                                <span className="badge">{ setUserAlianceLabel(userAliance) }</span>
                            </div>
                        </div>
                    </Fragment> :
                    <div className="signin_area">
                        임시
                    </div>
                }
            </div>
            <Banner/>
        </header>
    )
}

export default Header;