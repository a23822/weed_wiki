import React, {useCallback, useState} from 'react';
// import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { firebaseApp } from '../firebase/index';

const SignUp = (props) => {
    // onChange 관련
    const [dataList, setDataList] = useState({
        'form_email': '',
        'form_pw': '',
        'form_pw_chk': '',
        'form_agentName':'',
    })

    const [isValid, setIsValid] = useState({
        'email':false,
        'pw':false,
        'pw_re':false,
        'agentName':false,
    })

    const changeFormData = (e) => {
        setDataList({
            ...dataList,
            [e.target.name] : e.target.value,
        })
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

    // const isValid = dataList['form_email'].length > 0 &&
    //     dataList['form_pw'].length >= 6 &&
    //     dataList['form_pw'] === dataList['form_pw_chk'] &&
    //     dataList['form_pw'].length>0 &&
    //     dataList['form_agentName'].length>0;

    //회원가입 관련
    const handleSignUp = useCallback(
        async e => {
            e.preventDefault();
            try {
                const formElements = e.target.elements;
                const email = formElements[0].value;
                const password = formElements[1].value;
                const agentName = formElements[3].value;
                const nowTimeStamp = Math.floor(new Date().getTime()/1000);
                console.log(email);
                await firebaseApp.auth()
                    .createUserWithEmailAndPassword(email, password);
                props.history.push('/home');
                props.setBtn(false);
                const user_id = firebaseApp.auth().currentUser.uid;
                const userRef = firebaseApp.database().ref('users/' + user_id);
                userRef.set({
                    'email': email,
                    'agentName': agentName,
                    'rank': '준회원',
                    'aliance': '',
                    'timestamp': nowTimeStamp,
                });
            } catch(error) {
                alert(error);
            }
        }, []
    )

    return(
        <form onSubmit={handleSignUp}>
            <div className="form_inner">
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="text" aria-label="이메일" name="form_email" placeholder="honggildong@gmail.com"
                        onChange={changeFormData} onFocus={inputFocused} onBlur={inputBlur} className="inp_bx"/>
                    </div>
                    <label className="inp_label" aria-hidden="true">이메일</label>
                </div>
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="password" aria-label="비밀번호" name="form_pw" placeholder="최소 6글자 입력해주세요"
                        onChange={changeFormData} onFocus={inputFocused} onBlur={inputBlur} className="inp_bx"/>
                    </div>
                    <label className="inp_label" aria-hidden="true">비밀번호</label>
                </div>
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="password" aria-label="비밀번호 재확인" name="form_pw_chk" placeholder="비밀번호를 다시 입력해주세요"
                        onChange={changeFormData} onFocus={inputFocused} onBlur={inputBlur} className="inp_bx"/>
                    </div>
                    <label className="inp_label" aria-hidden="true">비밀번호 재확인</label>
                </div>
                <div className="inp_area">
                    <div className="inp_wrap">
                        <input type="text" aria-label="에이전트명" name="form_agentName" placeholder="에이전트명을 입력해주세요"
                        onChange={changeFormData} onFocus={inputFocused} onBlur={inputBlur} className="inp_bx"/>
                    </div>
                    <label className="inp_label" aria-hidden="true">에이전트명</label>
                </div>
                <div className="btn_area">
                    <button type="submit" className="submit_btn" disabled={!isValid}>
                        회원가입
                    </button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(SignUp);