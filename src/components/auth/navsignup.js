import React, { Fragment } from 'react';
import { FiUserPlus } from "react-icons/fi";

const NavSignUp = () => {
    return(
        <Fragment>
            <span className="menu_mark">
                <FiUserPlus className="nav_ico ico_signup"/>
            </span>
            <span className="txt">회원가입</span>
        </Fragment>
    )
}

export default NavSignUp;