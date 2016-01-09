import React from 'react';

// Components
import Text from '../Utils/Text';
import TimeAgo from '../Utils/TimeAgo';
import { Avatar, RetweetAvatar } from '../Utils/Avatar';
import { WeiboMedia } from '../Utils/Media';
import { WeiboAction } from '../Utils/Action';

export default ({ post, opts }) => (
    <div>
        {!opts.isAvatarLess ? <Avatar provider="weibo" {...post.retweet.user} /> : null}
        <div className="post__content">
            <Text provider="weibo" text={post.retweet.text} />

            {post.retweet.media && post.retweet.media.length > 0
                ? <WeiboMedia media={post.retweet.media} />
                : null
            }
        </div>

        <RetweetAvatar provider="weibo" {...post.user}/>

        <WeiboAction post={post.retweet} opts={opts} />

        <TimeAgo date={post.created_at} />
    </div>
);