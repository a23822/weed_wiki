import React, { Fragment } from 'react';
import { FiLogIn } from "react-icons/fi";

const NavSignIn = () => {
    return(
        <Fragment>
            <span className="menu_mark">
                <FiLogIn className="nav_ico ico_login"/>
            </span>
            <span className="txt">로그인</span>
        </Fragment>
    )
}

export default NavSignIn;