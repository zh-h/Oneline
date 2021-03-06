import React from 'react';

import UserLink from 'components/Utils/UserLink';
import Text from 'components/Utils/Post/Utils/Text';
import TimeAgo from 'components/Utils/Post/Utils/TimeAgo';

export default ({ provider, list }) => (
    <ul>
    {list.map((item, index) => (
        <li
            key={index}
            className={`detail__row center ${index === 0 ? 'detail__row--reply' : ''}`}
        >
            <span className="detail__row__avatar detail__avatar">
                <UserLink provider={provider} screen_name={item.screen_name}>
                    <img src={item.avatar} alt={`${item.name || item.screen_name}'s avatar`} />
                </UserLink>
            </span>
            <div className="detail__row__content">
                <Text
                    className="detail__row__text"
                    provider={provider}
                    text={item.text}
                />
                <TimeAgo className="detail__row__time" date={item.created_at} />
            </div>
        </li>
    ))}
    </ul>
);
