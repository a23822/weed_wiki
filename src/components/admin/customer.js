import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { firebaseApp } from '../firebase/index';

const Customer = () => {
    let history = useHistory();
    //page 수
    const [pageNum, setPageNum] = useState(1);
    //filter
    const [filter, setFilter] = useState('');
    //data
    const [customersInfo, setCustomersInfo] = useState([]);
    // DB연결
    const customersRef = firebaseApp.database().ref('users/');
    const linkDB = () => {
        customersRef.once('value').then(function(snapshot) {
            var pageIndexEnd = pageNum * 10;
            var pageIndexStart = (pageNum-1) * 10;
            var count = 0;
            var infoList = [];
            snapshot.forEach(function(childSnapshot) {
                if (count >= pageIndexStart && count < pageIndexEnd) {
                    // console.log(count);
                    var key = childSnapshot.key; // 유저 uid
                    var data = childSnapshot.val(); //agentName, aliance, email, rank
                    // console.log(data);
                    infoList.push({'uid':key,'data':data});
                } else if (count >= pageIndexEnd) {
                    return true;
                }
                count += 1;
            })
            setCustomersInfo(infoList);
        })
    }

    useEffect(() => {
        linkDB();
    },[pageNum])
    console.log(customersInfo);

    //뒤로가기 버튼
    
    const goBack = () => {
        history.goBack();
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
                    <button type="button" className="content_prev_btn">이전</button>
                    <input type="number" className="content_num_inp"/>
                    <button type="button" className="content_next_btn">다음</button>
                </div>
            </div>
        </div>
    )
}

export default Customer;