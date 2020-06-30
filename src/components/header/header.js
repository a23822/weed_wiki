import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../nav';

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
        {
            id: 5,
            menuName: 'Card',
            link:'/card',
        }
    ]

    return(
        <div className="header_wrap">
            <Auth/>
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