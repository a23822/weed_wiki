import React from 'react';
import Ico_WeedMan from '../../img/ico_weedman.png';

const SignIn = () => {
    return(
        <form>
            <div className="ico_area">
                <img src={Ico_WeedMan} className="ico_weedman" alt=""/>
            </div>
            <p className="tit">잡초위키</p>
            <div className="form_inner">
                <div className="inp_wrap">
                    <input type="text" aria-label="아이디" className="inp_bx"/>
                    <label className="inp_label" aria-hidden="true">아이디</label>
                </div>
            </div>
        </form>
    )
}

export default SignIn;