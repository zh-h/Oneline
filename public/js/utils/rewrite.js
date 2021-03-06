/* eslint max-len: 0, no-console: 0 */

import { isWeibo } from 'utils/detect';
import reduxStore from 'state/store';
const BLOCKED = reduxStore.getState().base.get('BLOCKED');

export const rewriteMediaLink = ({ type, provider, data }) => {
    __DEV__ && console.time('[rewriteMediaLink]');

    if (isWeibo(provider) || !BLOCKED) return data;

    const _HOST = __DEV__ ? 'http://127.0.0.1:8080' : window.location.origin;
    const PREFIX = `${_HOST}/media`;
    const REWRITER = {
        twitter: str => {
            return str.replace(
                /(https?:\/\/[\w|\-]+?\.twimg\.com[^"]*?)/g,
                `${PREFIX}?src=$1`
            );
        },
        weibo: str => {
            return str.replace(
                /(https?:\/\/[\w|\-]+?\.sinaimg.cn[^"]*?\.(gif|png|jpg|jpeg|mp4|webp))/g,
                `${PREFIX}?src=$1`
            );
        },
        unsplash: str => str,
    };

    let rewritedData;
    switch (type) {
        case 'sharers':
        case 'post':
            rewritedData = JSON.parse(REWRITER[provider](JSON.stringify(data)));
            break;
        default:
            __DEV__ && console.error(`invalid type: ${type}`);
            throw new TypeError(`invalid type: ${type}`);
    }

    __DEV__ && console.timeEnd('[rewriteMediaLink]');

    return rewritedData;
};
