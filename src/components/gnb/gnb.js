import React from 'react';
import { NavLink } from 'react-router-dom';

const Gnb = () => {
    const tab_info = [
        {
            id: 1,
            menuName:'Home',
            link:'/',
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
            <ul role="tablist" className="menu_tab_list">
                {tab_info.map(info => (
                    <li key={info.id} role="presentation" className="menu_tab">
                        <NavLink role="tab" className="tab" activeClassName="is_selected" exact to={info.link}>{info.menuName}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gnb;