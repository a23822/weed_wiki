import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { firebaseApp } from '../firebase/index';

const Customer = () => {
    let history = useHistory();
    //page 수
    const [pageNum, setPageNum] = useState(1);
    //filter
    // const [filter, setFilter] = useState('');
    //data
    const [customersInfo, setCustomersInfo] = useState([]);
    //총 page갯수
    const [totalPageNum, setTotalPageNum] = useState(0);
    // DB연결
    const linkDB = useCallback(() => {
            const customersRef = firebaseApp.database().ref('users/');
            customersRef.orderByChild('timestamp').once('value').then(function(snapshot) {
            var pageIndexEnd = pageNum * 10;
            var pageIndexStart = (pageNum-1) * 10;
            var count = 0;
            var infoList = [];
            var total_count = snapshot.numChildren();
            setTotalPageNum(Math.floor(total_count/10) + 1);
            snapshot.forEach(function(childSnapshot) {
                if (count >= pageIndexStart && count < pageIndexEnd) {
                    var key = childSnapshot.key; // 유저 uid
                    var data = childSnapshot.val(); //agentName, aliance, email, rank
                    infoList.push({'uid':key,'data':data});
                } else if (count >= pageIndexEnd) {
                    return true;
                }
                count += 1;
            })
            setCustomersInfo(infoList);
        })
    },[pageNum])

    useEffect(() => {
        linkDB();
    },[linkDB])

    //뒤로가기 버튼
    const goBack = () => {
        history.goBack();
    }
    
    //페이지 이동
    const [pageInpFocused, setPageInpFocused] = useState(false);
    const is_focused = pageInpFocused? true:false;
    const page_inp_classNames = classNames('page_inp', {is_focused});
    const type_first = pageNum === 1? true:false;
    const type_last = pageNum === totalPageNum? true:false;
    console.log(`pageNum: ${pageNum}// typeFirst: ${type_first}// typeLast: ${type_last}`);
    const prev_btn_classes = classNames('content_btn', {type_first});
    const next_btn_classes = classNames('content_btn', {type_last});
    const onClickPageLabel = (e) => {
        setPageInpFocused(true);
    };
    const onChangeInpPageNum = (e) => {
        if (e.target.value <= totalPageNum) {
            setPageNum(e.target.value);
        }
    }
    const onClickOrderBtn = (e) => {
        let flag = e.target.innerHTML;
        if (flag === '다음') {
            setPageNum(pageNum+1);
        } else if (flag ==='이전') {
            setPageNum(pageNum-1);
        }
    }

    return (
        <div className="admin_page">
            <div className="admin_inner">
                <button type="button" className="admin_back_btn" onClick={goBack}>뒤로가기</button>
                <p className="admin_title">
                    유저 편집
                </p>
                <div className="admin_content">
                    <div className="card_area">
                    {
                        customersInfo.map(info => (
                            <div className="card_wrap" key={info.uid}>
                                <span className="user_name">{info.data.agentName}</span>
                                <div className="info_wrap">
                                    <span className="info_label">연합명</span>
                                    <div className="info_bx">
                                        {info.data.aliance}
                                    </div>
                                </div>
                                <div className="info_wrap">
                                    <span className="info_label">이메일</span>
                                    <div className="info_bx">
                                        {info.data.email}
                                    </div>
                                </div>
                                <div className="info_wrap">
                                    <span className="info_label">등급</span>
                                    <div className="info_bx">
                                        {info.data.rank}
                                    </div>
                                </div>
                            </div>
                        ))   
                    }
                    </div>
                </div>
                <div className="content_footer_wrap">
                    <button type="button" onClick={onClickOrderBtn} className={prev_btn_classes}>이전</button>
                    <label htmlFor="inp_page" onClick={onClickPageLabel} className="page_bx">{pageNum}</label>
                    <input type="number" id="inp_page" onChange={onChangeInpPageNum} className={page_inp_classNames}/>
                    <span className="page_bx">/{totalPageNum}</span>
                    <button type="button" onClick={onClickOrderBtn} className={next_btn_classes}>다음</button>
                </div>
            </div>
        </div>
    )
}

export default Customer;