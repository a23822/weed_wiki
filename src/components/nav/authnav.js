import React, { useState, useEffect, useContext, Fragment } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import NavSignIn from './navsignin';
import NavSignUp from './navsignup';
import NavSignOut from './navsignout';
import { firebaseApp, AuthContext } from '../firebase/index';

const AuthNav = (props) => {
    const [navItems, setNavItems] = useState([
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
    ])

    //로그인여부
    const { currentUser } = useContext(AuthContext);

    //회원정보
    const [userAgentName, setUserAgentName] = useState('');
    const [userRank, setUserRank] = useState('');
    const [userAliance, setUserAliance] = useState('');

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
    })
    // var userRef = firebaseApp.database().ref('users/' + user_id);
    // userRef.once('value')
    //     .then(funtion(snapshot) {
    //         const agentName = snapshot.agentName;
    //     })

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
    }

    const initialFlag = props.isNavInitial;

    //nav초기화
    useEffect(()=>{
        if (initialFlag){
            changeAriaSelected(1);
        }
    },[initialFlag])

    return(
        <div className="cap_layer type_auth">
            <div className="profile_area">
                <div className="profile_wrap">
                    { currentUser?
                        <Fragment>
                            <div className="label_wrap">
                                { userRank === '준회원'? 
                                    <span className="label type_cadre">준회원</span> :
                                    <span className="label type_cadre">1급</span>
                                }
                                <span className="label type_arca">Arca</span>
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
            </ul>
        </div>
    )
}

export default AuthNav;