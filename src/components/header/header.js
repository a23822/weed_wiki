import React, { useState, useCallback } from 'react';
import TabList from './tabList';

const Header = () => {
    const [tab_info, setTabInfo] = useState([
        {
            id: 1,
            menuName:'Home',
            ariaSelected:'true',
            link:'/',
        },
        {
            id: 2,
            menuName:'Wiki',
            ariaSelected:'false',
            link:'/wiki',
        },
        {
            id: 3,
            menuName:'Todo',
            ariaSelected:'false',
            link:'/todo',
        },
        {
            id: 4,
            menuName:'Uniform',
            ariaSelected:'false',
            link:'/uniform',
        },
    ])

    // const tabClick = e => {
    //     for (var i=0;i<tab_info.length;i++){
    //         if (tab_info[i].ariaSelected){
    //             tab_info[i].ariaSelected = 'false';
    //         }
    //     }
    //     tab_info[e.target.getAttribute('tabindexnum')-1].ariaSelected = 'true';
    //     setTabInfo(tab_info);
    // };
    const tabClick = useCallback( e => {
        for (var i=0;i<tab_info.length;i++){
            if (tab_info[i].ariaSelected){
                tab_info[i].ariaSelected = 'false';
            }
        }
        tab_info[e.target.getAttribute('tabindexnum')-1].ariaSelected = 'true';
        setTabInfo(tab_info);
    },[tab_info])

    return(
        <div className="header_wrap">
            <a href="#" role="button" className="btn_menu" aria-pressed="false">
                
            </a>
            <div className="header_banner">
                
            </div>
            <ul className="menu_tablist" role="tablist">
                {/* {tab_info.map(info => (
                    <li key={info.id} role="presentation">
                        <Link role="tab" tabindexnum={info.id} onClick={tabClick} aria-selected={info.ariaSelected} className="tab" to={info.link}>{info.menuName}</Link>
                    </li>
                ))} */}
                <TabList tabinfo={tab_info} tabClick={tabClick}/>
            </ul>
        </div>
    )
}

export default Header;