import React, { Fragment } from 'react';
import { FiLogOut } from "react-icons/fi";

const NavSignOut = () => {
    return(
        <Fragment>
            <span className="menu_mark">
                <FiLogOut className="nav_ico ico_login"/>
            </span>
            <span className="txt">로그아웃</span>
        </Fragment>
    )
}

export default NavSignOut;