import React from 'react';
import {Link} from "react-router-dom";

function NotFound(props) {
    return (
        <h1 className='not_found_title'>Такой страницы не найдено <br/> <Link to="/" className='to_home'>На главную</Link></h1>
    );
}

export default NotFound;