import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/index';

const AuthRoute = () => {
    const {currentUser} = useContext(AuthContext);
    console.log(currentUser);
    return(
        <Fragment>
            {currentUser?
                <div>로그인됨</div> :
                <Link exact="true" to="/signin" className="signin_btn">로그인</Link>
            }
        </Fragment>
    )
}

export default AuthRoute;