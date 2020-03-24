import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthRoute from './authroute';

const Header = () => {
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
        <div className="header_wrap">
            <AuthRoute/>
            <div className="header_banner">
                
            </div>
            <ul className="menu_tablist">
                {tab_info.map(info => (
                    <li key={info.id}>
                        <NavLink className="tab" exact to={info.link}>{info.menuName}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Header;