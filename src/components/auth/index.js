import React, { useState, Fragment } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import SignIn from './signin';
import SignUp from './signup';
import AuthNav from './authnav';
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";

const Auth = () => {
    //레이어
    const [visible, setVisible] = useState(false);
    const is_visible = visible?true:false;
    const cap_layer_classNames = classNames('cap_layer', 'type_sign', {is_visible});
    //링크버튼
    const [btn_clicked, setBtn] = useState(false);
    const is_clicked = btn_clicked? true:false;
    const signin_btn_classNames = classNames('signin_btn', {is_clicked});

    // nav버튼 초기화
    const [isNavInitial, setNavInitial] = useState(false);

    let history = useHistory();
    let location = useLocation();
    const [temp_location, setTempLocation] = useState('/home');

    const onClickLink = () => {
        if (!is_clicked){
            setTempLocation(location);
            setBtn(true);
            setVisible(true);
            setNavInitial(false);
        } else {
            setBtn(false);
            setVisible(false);
            setNavInitial(true);
            history.push(temp_location);
        }
    }
    //닫기버튼
    const [btn_hovered, setBtnHover] = useState(false);
    const onHoverOver = (e) => {
        setBtnHover(true);
    }

    const onHoverOut = () => {
        setBtnHover(false);
    }

    return(
        <Fragment>
            <button type="button" onClick={onClickLink} className={signin_btn_classNames}>로그인</button>
            <div className={cap_layer_classNames}>
                <button type="button"
                    onClick={onClickLink} onMouseEnter={onHoverOver} onMouseLeave={onHoverOut}
                    className={'exit_btn'}>
                        {btn_hovered?<IoIosCloseCircle fill="#fff"/>:<IoIosCloseCircleOutline fill="#fff"/>}
                </button>
                <div className="form_area">
                    <Switch>
                        <Route path={[`/home`, '/wiki', '/todo', '/uniform', `/signin`]} component={SignIn}/>
                        <Route exact path={`/signup`} component={SignUp}/>
                    </Switch>
                </div>
            </div>
            <AuthNav isNavInitial={isNavInitial} setNavInitial={setNavInitial}/>
        </Fragment>
    )
}

export default Auth;