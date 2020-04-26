import React, { useState } from 'react';
import { firebaseApp } from '../firebase/index';

const Customer = () => {
    //page 수
    const [pageNum, setPageNum] = useState(1);
    //filter
    const [filter, setFilter] = useState('');
    //data
    const [customersInfo, setCustomersInfo] = useState([]);
    // DB연결
    const customersRef = firebaseApp.database().ref('users/');
    customersRef.once('value').then(function(snapshot) {
        var pageIndexEnd = pageNum * 10;
        var pageIndexStart = (pageNum-1) * 10;
        var count = 0;
        snapshot.forEach(function(childSnapshot) {
            if (count >= pageIndexStart && count < pageIndexEnd) {
                console.log(count);
                var key = childSnapshot.key; // 유저 uid
                var data = childSnapshot.val();
                console.log(data);
            } else if (count >= pageIndexEnd) {
                return true;
            }
            count += 1;
        })
    })
    
    return (
        <div className="admin_page">
            <p className="admin_title">
                유저 편집
            </p>
        </div>
    )
}

export default Customer;