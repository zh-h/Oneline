import React from 'react';
import classNames from 'classnames';

import './app.css';
import '../common/oneline.css';
import '../common/sidebar.css';

export default ({ location, main, leftSidebar, rightSidebar }) => {
    const isHome = !/^\/settings/.test(location.pathname);
    const mainClass = classNames({
        'oneline oneline--enter overflow--y animate--general': true,
        'oneline--timeline': isHome
    });
    const leftSidebarClass = classNames({
        'menu menu--left vertically_center animate--faster': true,
        'menu--timeline menu--timeline--left': isHome
    });
    const rightSidebarClass = classNames({
        'menu menu--right vertically_center animate--faster': true,
        'menu--timeline menu--timeline--right': isHome 
    });

    return (
        <div>
            <div className={mainClass}>
                {main}
            </div>

            <div className={leftSidebarClass}>
                {leftSidebar}
            </div>
            <div className={rightSidebarClass}>
                {rightSidebar}
            </div>
        </div>
    );
};