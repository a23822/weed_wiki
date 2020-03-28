import React, { useState, useEffect, useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
    //nav초기화
    const initialFlag = props.isNavInitial;
    
    useEffect(()=>{
        if (initialFlag){
            setNavItems(
                navItems.map(item =>
                    item.id === 1 ? {...item, ariaSelected:true} : {...item, ariaSelected:false}
                )
            )
        }
    },[])

    //로그인여부
    const { currentUser } = useContext(AuthContext);

    const onClickNav = (index) => {
        setNavItems(
            navItems.map(item =>
                item.id === index ? {...item, ariaSelected:true} : {...item, ariaSelected:false}
            )
        )
    }
    
    const onClickSignOut = () => {
        firebaseApp.auth().signOut();
    }

    return(
        <div className="cap_layer type_auth">
            <div className="profile_area">
                <div className="profile_wrap">
                    { currentUser?
                        <Fragment>
                            <div className="label_wrap">
                                <span className="label type_cadre">1급</span>
                                <span className="label type_arca">Arca</span>
                            </div>
                            <p className="profile_id">킹오브잡초맨</p>
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
                        <li role="presentation" key={item.id} className="item" onClick={() => onClickNav(item.id)}>
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