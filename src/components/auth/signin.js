import React from 'react';
import { useHistory } from 'react-router-dom';
import Ico_WeedMan from '../../img/ico_weedman.png';

const SignIn = () => {
    const history = useHistory();

    const onClickSubmit = () => {
        history.push('/home');
    }
    return(
        <form>
            <div className="ico_area">
                <img src={Ico_WeedMan} className="ico_weedman" alt=""/>
            </div>
            <p className="tit">잡초위키</p>
            <div className="form_inner">
                <div className="inp_wrap">
                    <input type="text" aria-label="이메일" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">이메일</label>
                </div>
                <div className="inp_wrap">
                    <input type="password" aria-label="비밀번호" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">비밀번호</label>
                </div>
                <div className="btn_area">
                    <button type="submit" onClick={onClickSubmit} className="submit_btn">로그인</button>
                </div>
            </div>
        </form>
    )
}

export default SignIn;