import React from 'react';
import { withRouter } from 'react-router-dom';
import Ico_WeedMan from '../../img/ico_weedman.png';
import { firebaseApp } from '../firebase/index';

const SignIn = ({ history, setBtn, setVisible }) => {
    const handleSignIn = (e) => {
        e.preventDefault();
        const formElements = e.target.elements;
        const email = formElements[0].value;
        const password = formElements[1].value;
        try {
            firebaseApp.auth().signInWithEmailAndPassword(email, password);
            history.push('/home');
            setBtn(false);
            setVisible(false);
        } catch (error) {
            if (error.code ==='auth/invalid-email'){
                alert('이메일 형식이 잘못되었습니다.');
            } else {
                alert('비밀번호를 다시 입력해주세요.');
            }
        }
    }

    //input focus
    const inputFocused = (e) => {
        e.target.parentNode.classList.add('is_filled');
    }

    //input blur
    const inputBlur = (e) => {
        if (!e.target.value){
            e.target.parentNode.classList.remove('is_filled');
        }
    }

    return(
        <form onSubmit={handleSignIn}>
            <div className="ico_area">
                <img src={Ico_WeedMan} className="ico_weedman" alt=""/>
            </div>
            <p className="tit">잡초위키</p>
            <div className="form_inner">
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="text" aria-label="이메일" className="inp_bx" onFocus={inputFocused} onBlur={inputBlur}/>
                    </div>
                    <label className="inp_label" aria-hidden="true">이메일</label>
                </div>
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="password" aria-label="비밀번호" className="inp_bx" onFocus={inputFocused} onBlur={inputBlur}/>
                    </div>
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