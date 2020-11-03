import React from 'react';
import { NavLink } from 'react-router-dom';

const Gnb = () => {
    const tab_info = [
        {
            id: 1,
            menuName:'Home',
            link:'/home',
        },
        {
            id: 2,
            menuName:'Wiki',
            link:'/wiki',
        },
        {
            id: 3,
            menuName:'Todo',
            link:'/todo',
        },
        {
            id: 4,
            menuName:'Uniform',
            link:'/uniform',
        },
    ]

    return(
        <div className="gnb_wrap">
            <div className="profile_wrap">
                <div className="thumb_wrap">
                    <img src="../../img/ico_default_profile.svg" width="30" height="30" className="img" alt="프로필 이미지"/>
                </div>
                <div className="info_wrap">
                    <span className="info"></span>
                    <div className="badge_wrap"></div>
                </div>
            </div>
            <ul role="tablist" className="menu_tab_list">
                {tab_info.map(info => (
                    <li key={info.id} role="presentation" className="menu_tab">
                        <NavLink role="tab" className="tab" exact to={info.link}>{info.menuName}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gnb;