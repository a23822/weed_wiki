import React from 'react';
import { firebaseApp } from '../firebase/index';

const Customer = () => {
    const customersRef = firebaseApp.database().ref('users/');
    customersRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key; // 유저 uid
            var data = childSnapshot.val();
            console.log(data);
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