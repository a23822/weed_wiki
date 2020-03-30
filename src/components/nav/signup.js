import React, {useCallback, useState} from 'react';
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

    const changeFormData = (e) => {
        setDataList({
            ...dataList,
            [e.target.name] : e.target.value,
        })
    }

    const isValid = dataList['form_pw']>6 ||
                    dataList['form_pw'] === dataList['form_pw_chk'];
    
    //회원가입 관련
    const handleSignUp = useCallback(
        async e => {
            e.preventDefault();
            
            if (isValid) {
                try {
                    await firebaseApp.auth()
                        .createUserWithEmailAndPassword(dataList['form_email'], dataList['form_pw']);
                    props.history.push('/home');
                    const user_id = firebaseApp.auth().currentUser.uid;
                    const userRef = firebaseApp.database().ref('users/' + user_id);
                    userRef.set({
                        'email': dataList['form_email'],
                        'agentName': dataList['form_agentName'],
                    });
                } catch(error) {
                    alert(error);
                }
            }
        }, []
    )

    return(
        <form onSubmit={handleSignUp}>
            <div className="form_inner">
                <div className="inp_wrap">
                    <input type="text" aria-label="이메일" name="form_email" placeholder="이메일을 입력해주세요"
                    onChange={changeFormData} className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">이메일</label>
                </div>
                <div className="inp_wrap">
                    <input type="password" aria-label="비밀번호" name="form_pw" placeholder="비밀번호를 입력해주세요"
                    onChange={changeFormData} className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">비밀번호</label>
                </div>
                <div className="inp_wrap">
                    <input type="password" aria-label="비밀번호 재확인" name="form_pw_chk" placeholder="비밀번호를 다시 입력해주세요"
                    onChange={changeFormData} className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">비밀번호 재확인</label>
                </div>
                <div className="inp_wrap">
                    <input type="text" aria-label="에이전트명" name="form_agentName" placeholder="에이전트명을 입력해주세요"
                    onChange={changeFormData} className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">에이전트명</label>
                </div>
                <div className="btn_area">
                    <button type="submit" className="submit_btn">회원가입</button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(SignUp);