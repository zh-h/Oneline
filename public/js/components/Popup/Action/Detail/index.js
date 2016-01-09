import React from 'react';

// Helper
import { Action } from '../../../../utils/api';

// Components
import Spin from '../../../Utils/Spin';
import Post from '../../../Utils/Post';
import DetailContainer from './DetailContainer';

// Export
export default class Detail extends React.Component {
    constructor(props) {
        const historyState = props.location.state;
        const restoreState = historyState && historyState.likedList ? historyState : null;

        super(props)
        this.state = restoreState || {
            post: historyState,
            likedList: [],
            replyList: [],
            retweetedList: [],
            isFetching: false,
            isFetchFail: false,
            isInitLoad: true
        }
    }
    loadDetail() {
        const { action, provider, id, location } = this.props;
        const { isFetching } = this.state;

        if (isFetching) return;
        this.setState({ isFetching: true, isFetchFail: false })

        Action
        .get({ action, provider, id })
        .then(res => {
            // Update State
            const post = res.body.post || location.state;
            const likedList = res.body.like || [];
            const replyList = res.body.reply || [];
            const retweetedList = res.body.retweet || [];
            const newState = {
                post,
                likedList,
                replyList,
                retweetedList,
                isFetching: false,
                isFetchFail: false,
                isInitLoad: false
            };
            this.setState(newState)
            // Store State in History State
            const { history } = this.props;
            history.replace({
                pathname: location.pathname,
                search: location.search,
                state: newState
            })
        })
        .catch(err => {
            __DEV__ && console.error(err)
            this.setState({ isFetching: false, isFetchFail: true })
        })
    }
    componentDidMount() {
        if (this.state.isInitLoad) {
            this.loadDetail()
        }
    }
    render() {
        const { provider } = this.props;
        const { post, isInitLoad, isFetching, isFetchFail } = this.state;
        return (
            isInitLoad
                ? <Spin
                    type="oldPosts"
                    provider={provider}
                    initLoad={isInitLoad}
                    isFetching={isFetching}
                    isFetchFail={isFetchFail}
                    onClick={this.loadPosts}
                />
            : <div className="detail overflow--y animate--enter">
                <Post className="detail__post" item={post} isDetailPost={true} />
                <DetailContainer provider={provider} {...this.state} />
            </div>
        );
    }
}