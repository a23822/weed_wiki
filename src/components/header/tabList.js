import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const TabList = ({tabinfo, tabClick}) => {
    return(
        <Fragment>
            {tabinfo.map(info => (
                <li key={info.id} role="presentation">
                    <Link role="tab" tabindexnum={info.id} onClick={tabClick} aria-selected={info.ariaSelected} className="tab" to={info.link}>{info.menuName}</Link>
                </li>
            ))}
        </Fragment>
    )
}

export default TabList;