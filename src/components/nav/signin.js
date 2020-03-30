import React from 'react';
import { withRouter } from 'react-router-dom';
import Ico_WeedMan from '../../img/ico_weedman.png';
import { firebaseApp } from '../firebase/index';

const SignIn = ({ history, setBtn }) => {
    const handleSignIn = (e) => {
        e.preventDefault();
        const formElements = e.target.elements;
        const email = formElements[0].value;
        const password = formElements[1].value;
        try {
            firebaseApp.auth().signInWithEmailAndPassword(email, password);
            history.push('/home');
            setBtn(false);
        } catch (error) {
            console.log(error);
        }
    } 

    return(
        <form onSubmit={handleSignIn}>
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
                    <button type="submit" className="submit_btn">로그인</button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(SignIn);