import React from 'react';
// import { Link, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { firebaseApp } from '../firebase/index';

const Admin = (props) => {
    
    return (
        <div className="admin_page">
            <p className="admin_title">
                관리자 페이지
            </p>
            <Link exact="true" to="/admin/customer" className="admin_menu_item">유저 관리</Link>
            <Link exact="true" to="/admin/characterdb" className="admin_menu_item">캐릭터 DB 관리</Link>
            <Link exact="true" to="/home" className="admin_menu_item">홈으로</Link>
        </div>
    )
}

export default Admin;