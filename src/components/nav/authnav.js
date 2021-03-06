import React, { useState, useEffect, useContext, Fragment, useCallback } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import NavSignIn from './navsignin';
import NavSignUp from './navsignup';
import NavSignOut from './navsignout';
import { firebaseApp, AuthContext } from '../firebase/index';
import dotenv from 'dotenv';

dotenv.config();

const AuthNav = (props) => {
    const initNavState = [
        {
            id: 1,
            menu: <NavSignIn/>,
            ariaSelected:true,
            link: `/signin`,
        },
        {
            id: 2,
            menu: <NavSignUp/>,
            ariaSelected:false,
            link: `/signup`,
        }
    ]
    const [navItems, setNavItems] = useState(initNavState);

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

    const changeAriaSelected = (index) => {
        setNavItems(
            navItems.map(item =>
                item.id === index ? {...item, ariaSelected:true} : {...item, ariaSelected:false}
            )
        )
    }

    //로그아웃
    const history = useHistory();

    const onClickSignOut = () => {
        firebaseApp.auth().signOut();
        history.push('/home');
        props.setBtn(false);
        window.location.reload();
    }

    const onClickAdmin = () => {
        history.push('/admin');
        props.setBtn(false);
    }

    const initialFlag = props.isNavInitial;

    const setInitNavState = useCallback(() => {
        if (initialFlag){
            setNavItems([
                {
                    id: 1,
                    menu: <NavSignIn/>,
                    ariaSelected:true,
                    link: `/signin`,
                },
                {
                    id: 2,
                    menu: <NavSignUp/>,
                    ariaSelected:false,
                    link: `/signup`,
                }
            ]);
        }
    }, [initialFlag])

    useEffect(()=>{
        setInitNavState();
    },[setInitNavState])

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
        <div className="cap_layer type_auth">
            <div className="profile_area">
                <div className="profile_wrap">
                    { currentUser?
                        <Fragment>
                            <div className="label_wrap">
                                { setUserRankLabel(userRank) }
                                { setUserAlianceLabel(userAliance) }
                            </div>
                            <p className="profile_id">{userAgentName}</p>
                        </Fragment> :
                        <p className="placeholder">로그인해주세요</p>
                    }
                </div>
            </div>
            <ul role="tablist" className="auth_nav">
                { currentUser?
                    <li role="presentation" className="item">
                        <NavLink exact to="/home" onClick={onClickSignOut} role="tab" aria-selected="true" className="link_btn">
                            <NavSignOut/>
                        </NavLink>
                    </li> :
                    navItems.map(item => (
                        <li role="presentation" key={item.id} className="item" onClick={() => changeAriaSelected(item.id)}>
                            <NavLink exact to={item.link} role="tab" aria-selected={item.ariaSelected}
                            className="link_btn">
                                {item.menu}
                            </NavLink>
                        </li>
                    ))
                }
                { isAdmin?
                    <li role="presentation" className="item">
                        <NavLink exact to="/admin" onClick={onClickAdmin} role="tab" aria-selected="false" className="link_btn">
                            Admin
                        </NavLink>
                    </li> : null
                }
            </ul>
        </div>
    )
}

export default AuthNav;