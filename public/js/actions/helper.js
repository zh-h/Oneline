import { Promise } from 'es6-promise';

import { Timeline } from '../utils/api';

export const determineFetchFrom = ({
    postsType,
    isAutoFetch,

    activeProviders,

    newPosts,
    allPosts,
    timePointer,
    timeRange
}) => {

    return new Promise((resolve, reject) => {
        let fetchFrom, invalidProviders;

        switch (postsType) {
            case 'newPosts':
                const hasNewPostsInLocal = newPosts.unreadCount > 0;
                const isFetchFromLocal = hasNewPostsInLocal && !isAutoFetch;

                fetchFrom = isFetchFromLocal ? 'local' : 'remote';
                invalidProviders = isFetchFromLocal ? [] : activeProviders;
                break;
            case 'oldPosts':
                invalidProviders = activeProviders.filter(
                    provider => timePointer - allPosts.minDate[provider] < timeRange
                );
                fetchFrom = invalidProviders.length <= 0 ? 'local' : 'remote';
                break;
        }

        resolve({ fetchFrom, invalidProviders });
    })
}

export const fetchFromLocal = ({ postsType, showingPosts, allPosts, timePointer, timeRange }) => {
    return new Promise((resolve, reject) => {
        const { newUnreadCount, newShowingPosts, newTimePointer } = postsType === 'newPosts'
            ? extractFreshPosts({ allPosts, timeRange })
        : extractOldPosts({ showingPosts, allPosts, timePointer, timeRange });

        resolve({
            postsType,
            unreadCount: newUnreadCount,
            showingPosts: newShowingPosts,
            allPosts,
            timePointer: newTimePointer
        })
    })
}

export const fetchFromRemote = ({
    postsType,
    isAutoFetch,

    invalidProviders,

    newPosts,
    isInitLoad,
    showingPosts,
    allPosts,
    timePointer,
    timeRange
}) => {

    return new Promise((resolve, reject) => {
        const isFetchNewPosts = postsType === 'newPosts';

        Timeline
        .get({ id: isInitLoad ? null : getQueryIdStr({ isFetchNewPosts, invalidProviders, allPosts }) })
        .then(res => {
            // Reject for Wrong Response
            if (!res.body.data) {
                reject(new Error('[FetchFail]: WTF Responses?'))
                return;
            } else if (res.body.data && res.body.data.length <= 0 && isFetchNewPosts) {
                reject(new Error('[FetchFail]: No More Posts'))
                return;
            }
            // Init Response Data
            const { maxId, maxDate } = isFetchNewPosts || isInitLoad ? res.body : allPosts;
            const { minId, minDate } = !isFetchNewPosts || isInitLoad ? res.body : allPosts;
            const newAllPosts = {
                posts: allPosts.posts.concat(res.body.data),
                maxId,
                maxDate,
                minId,
                minDate
            };
            // Store and dispatch
            if (isAutoFetch){
                resolve({
                    postsType,
                    unreadCount: newPosts.unreadCount + res.body.data.length,
                    showingPosts,
                    allPosts: newAllPosts,
                    timePointer
                })
            } else {
                const { newUnreadCount, newShowingPosts, newTimePointer } = isFetchNewPosts
                    ? extractFreshPosts({ allPosts: newAllPosts, timeRange })
                : extractOldPosts({ showingPosts, allPosts: newAllPosts, timePointer, timeRange });

                resolve({
                    postsType,
                    unreadCount: newUnreadCount,
                    showingPosts: newShowingPosts,
                    allPosts: newAllPosts,
                    timePointer: newTimePointer
                })
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}


// 提取最新 30 分鐘內的貼文
function extractFreshPosts({ allPosts, timeRange }) {
    const NOW = Date.now();

    return {
        newUnreadCount: 0,
        newShowingPosts: allPosts.posts.filter(post => NOW - post.created_at < timeRange),
        newTimePointer: NOW - timeRange,
    };
}
// 提取下一個（非空） 30 分鐘內的貼文
function extractOldPosts({ showingPosts, allPosts, timePointer, timeRange }) {
    let isEmpty = true;
    let newShowingPosts = [];
    let newTimePointer = timePointer;

    while (isEmpty){
        newShowingPosts = allPosts.posts.filter(post => {
            let timeDiff = newTimePointer - post.created_at;

            return 0 < timeDiff && timeDiff <= timeRange;;
        })

        newTimePointer -= timeRange

        if (newShowingPosts.length > 0){
            isEmpty = false
        }
    }

    newShowingPosts = sortPosts(showingPosts.concat(newShowingPosts))
    newTimePointer = newShowingPosts[newShowingPosts.length - 1].created_at

    return {
        newShowingPosts,
        newTimePointer
    };
}
// 向後端獲取貼文的查詢字段
function getQueryIdStr({ isFetchNewPosts, invalidProviders, allPosts }) {
    let [typeForLocal, typeForRemote] = isFetchNewPosts ? ['maxId', 'minId'] : ['minId', 'maxId'];
    let queryIdStr = '';

    invalidProviders.forEach((provider, index) => {
        const SUFFIX = index === invalidProviders.length - 1 ? '' : ',';

        queryIdStr += `${provider}_${typeForRemote}-${allPosts[typeForLocal][provider]}${SUFFIX}`;
    })

    return queryIdStr;
}
function sortPosts(posts) {
    return posts.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
}