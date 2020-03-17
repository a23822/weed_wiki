import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const TabListItem = ({info, tabClick}) => {
    const { id, menuName, ariaSelected, link } = info;
    
    return (
        <Fragment>
            <Link role="tab" onClick={tabClick} aria-selected={ariaSelected} className="tab" to={link}>{menuName}</Link>
        </Fragment>
    )
}

export default TabListItem;