import React from 'react';

// Components
import { Avatar } from '../Utils/Avatar';
import Text from '../Utils/Text';
import { WeiboMedia } from '../Utils/Media';
import TimeAgo from '../Utils/TimeAgo';
import { Retweet, Reply, Source, Star } from '../Utils/Action';

export default props => (
    <div className="post post--weibo">
        <Avatar provider="weibo" {...props.user} />
        <div className="post__content">
            <Text
                text={props.text}
                middlewares={[
                    { middleware: 'linkify', opts: { provider: 'weibo' } },
                    { middleware: 'weiboEmotify' }
                ]}
            />
            {
                props.media && props.type === 'tweet' && props.media.length > 0
                    ? <WeiboMedia media={props.media} />
                : null
            }
        </div>

        <div className="post post--quote post--quote--weibo">
            <Avatar provider="weibo" {...props.retweet.user} />
            <div className="post__content">
                <Text
                    text={props.retweet.text}
                    middlewares={[
                        { middleware: 'linkify', opts: { provider: 'weibo' } },
                        { middleware: 'weiboEmotify' }
                    ]}
                />
                {
                    props.media && props.media.length > 0
                        ? <WeiboMedia media={props.media} />
                    : null
                }
            </div>
            <span className="cursor--pointer">
                <Retweet
                    provider={props.provider}
                    id={props.retweet.id_str}
                    count={props.retweet.retweet_count}
                    post={props}
                />
                <Reply provider={props.provider} id={props.retweet.id_str} post={props} />
                <Source provider="weibo" uid={props.retweet.user.uid} mid={props.retweet.mid} />
                <Star />
            </span>

            <TimeAgo date={props.retweet.created_at} />
        </div>

        <span className="cursor--pointer">
            <Retweet provider={props.provider} id={props.id_str} count={props.retweet_count} post={props} />
            <Reply provider={props.provider} id={props.id_str} post={props} />
            <Source provider="weibo" uid={props.user.uid} mid={props.mid} />
            <Star />
        </span>

        <TimeAgo date={props.created_at} />
    </div>
);