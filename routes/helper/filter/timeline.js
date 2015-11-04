/** 
 * 向前端發送數據前，過濾多餘信息
 *
 */
var extend = require('extend'),
    mid    = require('weibo-mid'),
    filterUtils = require('./utils');


var filter = {
    twitter: function (data){
        var cache = [],
            _now  = Date.now();

        data.forEach(function (item){
            var _created_at = Date.parse(item.created_at);

            if (_created_at > _now) return;

            var tweetObj = {
                provider: 'twitter',
                created_at: _created_at,
                id_str: item.id_str,
                user: filterUtils.twitter.user(item.user),
                text: item.text,
                retweet_count: item.retweet_count,
                favorite_count: item.favorite_count,
                retweeted: item.retweeted,
                favorited: item.favorited
            }

            // Retweet
            if (item.retweeted_status){
                extend(tweetObj, {
                    type: 'retweet',
                    r_id_str: item.id_str,
                    id_str: item.retweeted_status.id_str,
                    text: item.retweeted_status.text,
                    retweet: {
                        created_at: Date.parse(item.retweeted_status.created_at),
                        user: filterUtils.twitter.user(item.retweeted_status.user)
                    },
                    favorite_count: item.retweeted_status.favorite_count
                })

                if (item.retweeted_status.extended_entities && item.retweeted_status.extended_entities.media){
                    extend(tweetObj, {
                        media: filterUtils.twitter.media(item.retweeted_status.extended_entities.media),
                        mediaLink: item.retweeted_status.extended_entities.media[0].url
                    })
                }
            } 
            // Quote
            else if (item.quoted_status){
                extend(tweetObj, {
                    type: 'quote',
                    quote: {
                        created_at: Date.parse(item.quoted_status.created_at),
                        id_str: item.quoted_status.id_str,
                        text: item.quoted_status.text,
                        user: filterUtils.twitter.user(item.quoted_status.user)
                    }
                })

                if (item.quoted_status.extended_entities && item.quoted_status.extended_entities.media){
                    extend(tweetObj.quote, {
                        media: filterUtils.twitter.media(item.quoted_status.extended_entities.media),
                        mediaLink: item.quoted_status.extended_entities.media[0].url
                    })
                }
            }
            // Reply / Tweet
            else {
                extend(tweetObj, {
                    type: 'tweet'
                })
            }

            // Media
            if (item.extended_entities && item.extended_entities.media){
                extend(tweetObj, {
                    media: filterUtils.twitter.media(item.extended_entities.media),
                    mediaLink: item.extended_entities.media[0].url
                })
            }

            // Location
            if (item.place){
                extend(tweetObj, {
                    location: {
                        id: item.place.id,
                        name: item.place.name
                    }
                })
            }

            cache.push(tweetObj)
        })

        var returnObj = { data: cache },
            firstData = data[0],
            lastData  = data[data.length - 1];

        if (lastData){
            extend(returnObj, {
                min_id  : lastData.id_str,
                min_date: Date.parse(lastData.created_at),
                max_id  : firstData.id_str,
                max_date: Date.parse(firstData.created_at)
            })
        }

        return returnObj;
    },
    instagram: function (data){
        var cache = [],
            _now  = Date.now();

        data.forEach(function (item){
            var _created_at = Date.parse(new Date(item.created_time * 1000));

            if (_created_at > _now) return;

            var igPost = {
                provider: 'instagram',
                created_at: _created_at,
                id_str: item.id,
                type: 'post',
                user: filterUtils.instagram.user(item.user),
                text: item.caption && item.caption.text,
                images: filterUtils.instagram.media(item.images),
                favorite_count: item.likes.count,
                favorited: item.user_has_liked,
                reply_count: item.comments.count,
                link: item.link
            }

            // Video
            if (item.type === 'video'){
                extend(igPost, {
                    videos: {
                        low_resolution: item.videos.low_resolution.url,
                        standard_resolution: item.videos.standard_resolution.url
                    }
                })
            }

            // User In Photo
            if (item.users_in_photo.length > 0){
                extend(igPost, {
                    users_in_photo: item.users_in_photo,
                })
            }

            // Location
            if (item.location){
                extend(igPost, {
                    location: {
                        name: item.location.name,
                        id: item.location.id
                    }
                })
            }

            cache.push(igPost)
        })


        var returnObj = { data: cache },
            firstData = data[0],
            lastData  = data[data.length - 1];

        if (lastData){
            extend(returnObj, {
                min_id  : lastData.id,
                min_date: Date.parse(new Date(lastData.created_time * 1000)),
                max_id  : firstData.id,
                max_date: Date.parse(new Date(firstData.created_time * 1000))
            })
        }

        return returnObj;
    },
    weibo: function (data){
        var cache = [],
            _now  = Date.now();

        data.forEach(function (item){
            var _created_at = Date.parse(item.created_at);

            if (_created_at > _now) return;

            var weiboObj = {
                provider: 'weibo',
                created_at: _created_at,
                id_str: item.idstr,
                mid: mid.encode(item.mid),
                user: filterUtils.weibo.user(item.user),
                text: item.text,
                retweet_count: item.reposts_count,
                comments_count: item.comments_count,
                favorite_count: item.attitudes_count
            }

            // Retweet & Quote
            if (item.retweeted_status){
                var retweetType = /^转发微博|Repost|轉發微博$/.test(item.text) ? 'retweet' : 'quote',
                    retweetItem = item.retweeted_status;

                retweetType === 'retweet'
                    ? extend(weiboObj, {
                        r_id_str: item.idstr,
                        id_str: retweetItem.idstr,
                        retweet_count: retweetItem.reposts_count,
                        comments_count: retweetItem.comments_count,
                        favorite_count: retweetItem.attitudes_count
                    })
                : null

                extend(weiboObj, {
                    type: retweetType,
                    retweet: {
                        created_at: Date.parse(retweetItem.created_at),
                        id_str: retweetItem.idstr,
                        mid: mid.encode(retweetItem.mid),
                        user: filterUtils.weibo.user(retweetItem.user),
                        text: retweetItem.text
                    }
                })

                // media
                if (retweetItem.pic_urls && retweetItem.pic_urls.length > 0 
                    || retweetItem.pic_ids && retweetItem.pic_ids.length > 0){
                    extend(weiboObj, {
                        media: filterUtils.weibo.media(retweetItem.pic_urls || retweetItem.pic_ids)
                    })
                }
            }
            // Reply / Tweet (Weibo)
            else {
                extend(weiboObj, {
                    type: 'tweet'
                })
            }

            // Media
            if (item.pic_urls && item.pic_urls.length > 0 || item.pic_ids && item.pic_ids.length > 0){
                extend(weiboObj, {
                    media: filterUtils.weibo.media(item.pic_urls || item.pic_ids)
                })
            }

            // Location
            if (item.geo && item.geo.type === 'Point'){
                extend(weiboObj, {
                    location: {
                        lat: item.geo.coordinates[0],
                        long: item.geo.coordinates[1]
                    }
                })
            }

            cache.push(weiboObj)
        })

        var returnObj = { data: cache },
            firstData = data[0],
            lastData  = data[data.length - 1];

        if (lastData){
            extend(returnObj, {
                min_id  : lastData.idstr,
                min_date: Date.parse(lastData.created_at),
                max_id  : firstData.idstr,
                max_date: Date.parse(firstData.created_at)
            })
        }

        return returnObj;
    }
}

module.exports = filter