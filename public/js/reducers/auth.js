import update from 'react-addons-update'

import { ADD_TOKEN, REMOVE_TOKEN }  from '../actions/auth';
import { getActiveProviders } from '../utils/tokenHelper';

let initialState = {
    providers: ['twitter', 'instagram', 'weibo'],
    activeProviders: getActiveProviders(),
    tokenList: localStorage.getItem('tokenList')
};


export default (state = initialState, action) => {
    switch (action.type){
        case ADD_TOKEN:
        case REMOVE_TOKEN:
            return update(state, {
                activeProviders: { $set: action.activeProviders },
                tokenList: { $set: action.tokenList }
            })
            break;
        default: 
            return state;
            break;
    }
}
