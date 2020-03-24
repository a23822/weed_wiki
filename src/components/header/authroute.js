import React, { useContext, Fragment } from 'react';
import { AuthContext } from '../firebase/index';
import Auth from '../auth';

const AuthRoute = () => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return(
        <Fragment>
            {currentUser?
                <div className="menu_btn">로그인됨</div> :
                <Auth/>
            }
        </Fragment>
    )
}

export default AuthRoute;