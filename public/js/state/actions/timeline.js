/* eslint no-console: 0, no-use-before-define: [2, { "functions": false }], consistent-return: 0 */

/**
 * Reset Timeline State
 *
 */
export const RESET_STATE = 'RESET_STATE';
export const resetState = () => ({ type: RESET_STATE });

/**
 * Fetch Posts
 *
 */
import { determineFetchFrom, fetchFromLocal, fetchFromRemote } from './helper';

export const FETCH_START = 'FETCH_START';
const fetchStart = (payload) => ({ type: FETCH_START, payload });

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
const postsRecive = (payload) => ({ type: RECEIVE_POSTS, payload });

export const FETCH_FAIL = 'FETCH_FAIL';
const fetchFail = (payload) => ({ type: FETCH_FAIL, payload });

export const fetchPosts = ({ postsType, isAutoFetch }) => {
    return (dispatch, getState) => {
        const _state = getState();
        const auth = _state.auth.toObject();
        const timeline = _state.timeline.toObject();

        if (timeline[postsType].get('isFetching')) return false;

        return determineFetchFrom({ postsType, isAutoFetch, ...auth, ...timeline })
        .then(({ fetchFrom, invalidProviders }) => {
            __DEV__ && console.info(`[${postsType}: fetchFrom] ${fetchFrom}`);

            if (fetchFrom === 'local') {
                fetchFromLocal({ postsType, ...timeline })
                .then(newState => dispatch(postsRecive(newState)))
                .catch(err => {
                    throw err;
                });
            } else if (fetchFrom === 'remote') {
                dispatch(fetchStart({ postsType }));

                return fetchFromRemote({
                    postsType,
                    isAutoFetch,
                    invalidProviders,
                    ...timeline,
                })
                .then(newState => dispatch(postsRecive(newState)))
                .catch(err => {
                    dispatch(fetchFail({ postsType }));
                    throw err;
                });
            }
        });
    };
};

/**
 * Manipulate (Single) Post
 *
 */
import { fromJS } from 'immutable';

export const UPDATE_POST = 'UPDATE_POST';
export const updatePost = (newPost) => {
    const id = newPost.id_str;

    return (dispatch, getState) => {
        __DEV__ && console.time(`[updatePost: ${id}]`);

        const _state = getState();
        const showingPosts = _state.timeline.get('showingPosts');
        const allPosts = _state.timeline.get('allPosts');

        const newShowingPosts = showingPosts.map(updatePostIfFound);
        const newAllPosts = allPosts.get('posts').map(updatePostIfFound);

        dispatch({
            type: UPDATE_POST,
            payload: {
                showingPosts: newShowingPosts,
                allPosts: allPosts.set('posts', newAllPosts),
            },
        });

        __DEV__ && console.timeEnd(`[updatePost: ${id}]`);
    };

    function updatePostIfFound(post) {
        const nestPostType = post.retweet && 'retweet' || post.quote && 'quote';
        const postId = post.id_str;
        const nestPostId = nestPostType && post[nestPostType].id_str;

        if (id === postId) {
            return fromJS(post).mergeDeep(newPost).toJS();
        } else if (id === nestPostId) {
            return fromJS(post).mergeDeep({ [nestPostType]: newPost }).toJS();
        }

        return post;
    }
};
export const deletePost = ({ id }) => {
    return (dispatch, getState) => {
        __DEV__ && console.time(`[deletePost: ${id}]`);

        const _state = getState();
        const showingPosts = _state.timeline.get('showingPosts');
        const allPosts = _state.timeline.get('allPosts');

        const newShowingPosts = showingPosts.filter(deletePostIfFound);
        const newAllPosts = allPosts.get('posts').filter(deletePostIfFound);

        dispatch({
            type: UPDATE_POST,
            payload: {
                showingPosts: newShowingPosts,
                allPosts: allPosts.set('posts', newAllPosts),
            },
        });

        __DEV__ && console.timeEnd(`[deletePost: ${id}]`);
    };

    function deletePostIfFound(post) {
        return post.id_str !== id;
    }
};

/**
 * Update Showing Posts
 *
 */
export const UPDATE_SHOWINGS_POSTS = 'UPDATE_SHOWINGS_POSTS';
export const updateShowingPosts = (showingPosts) => ({
    type: UPDATE_SHOWINGS_POSTS,
    payload: { showingPosts },
});
