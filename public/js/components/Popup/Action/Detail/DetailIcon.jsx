import React from 'react';
import classNames from 'classnames';

import Icon from 'components/Utils/Icon';

import numAbbr from 'utils/numAbbr';


export default ({ name, text, active }) => {
    const iconClass = classNames({
        detail__actionsColumn__icon: true,
        [`color--${name}`]: active,
        'color--gray-drak': !active,
    });

    let _text;
    switch (text.type) {
        case 'count':
            _text = text.content && numAbbr(text.content) || '?';
            break;
        case 'date':
            _text = new Date(text.content).toLocaleDateString();
            break;
        default:
            _text = text.content;
            break;
    }

    return (
        <span className={iconClass} data-text={_text}>
            <Icon name={name} />
        </span>
    );
};
