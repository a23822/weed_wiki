import React from 'react';

const SignUp = () => {
    return(
        <form>
            <div className="form_inner">
                <div className="inp_wrap">
                    <input type="text" aria-label="이메일" placeholder="이메일을 입력해주세요" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">이메일</label>
                </div>
                <div className="inp_wrap">
                    <input type="password" aria-label="비밀번호" placeholder="비밀번호를 입력해주세요" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">비밀번호</label>
                </div>
                <div className="inp_wrap">
                    <input type="password" aria-label="비밀번호 재확인" placeholder="비밀번호를 다시 입력해주세요" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">비밀번호 재확인</label>
                </div>
                <div className="inp_wrap">
                    <input type="text" aria-label="에이전트명" placeholder="에이전트명을 입력해주세요" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">에이전트명</label>
                </div>
                <div className="btn_area">
                    <button type="submit" className="submit_btn">로그인</button>
                </div>
            </div>
        </form>
    )
}

export default SignUp;