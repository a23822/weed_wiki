import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TabListItem from './tabListItem';

const TabList = ({tabinfo, tabClick}) => {
    return(
        <Fragment>
            {tabinfo.map(info => (
                <li key={info.id} role="presentation">
                    <TabListItem info={info} tabClick={tabClick} />
                </li>
            ))}
        </Fragment>
    )
}

export default TabList;