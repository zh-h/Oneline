import React from 'react';
import { browserHistory as history } from 'react-router';

import Write from './Write';
import Read from './Read';
import Detail from './Detail';
import Share from './Share';
import Search from './Search';

export const Action = props => {
    const { action } = props.params;

    let SelectAction;
    switch (action) {
        case 'user':
        case 'locations':
        case 'tags':
            SelectAction = Read;
            break;
        case 'tweet':
        case 'retweet':
        case 'quote':
        case 'reply':
            SelectAction = Write;
            break;
        case 'detail':
            SelectAction = Detail;
            break;
        case 'share':
            SelectAction = Share;
            break;
        case 'search':
            SelectAction = Search;
            break;
        default:
            break;
    }

    return (
        <SelectAction
            history={history}
            location={props.location}
            {...props.params} // provider, action, id
        />
    );
};
