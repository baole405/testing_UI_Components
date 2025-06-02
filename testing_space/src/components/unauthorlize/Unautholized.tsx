import React from "react";
import {Link} from "react-router-dom";


const Unauthorized = () => {
    return (
        <div>
            <h1>Trang này không có quyền</h1>
            <h1>Cút ra chỗ khác!</h1>
            <Link to="/login">Quay về Trang Chủ</Link>
        </div>
    );
};

export default Unauthorized;