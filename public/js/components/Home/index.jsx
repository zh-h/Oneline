import React from 'react';
import Swipeable from 'react-swipeable';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { browserHistory as history } from 'react-router';

// Helpers
import { replaceTokenList } from 'state/actions/auth';
import { resetState, fetchPosts, updateShowingPosts } from 'state/actions/timeline';
import DependencyLoader from './loader';

// Components
import Post from 'components/Utils/Post';
import Spin from 'components/Utils/Spin';
import Transition from 'components/Utils/Transition';
import ScrollToTop from '../Utils/ScrollToTop';
import SearchLocal from './SearchLocal';
class Timeline extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        __DEV__ && console.time('[shallowCompare]')
        const shouldUpdate = shallowCompare(this, nextProps, nextState);
        __DEV__ && console.timeEnd('[shallowCompare]')
        return shouldUpdate;
    }
    render() {
        const { showingPosts, highlight } = this.props;
        return (
            <div>
            {
                showingPosts
                .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
                .map(item => (
                    <Post key={item.id_str} post={item} highlight={highlight} />
                ))
            }
            </div>
        );
    }
}
class Home extends React.Component {
    constructor (props){
        super(props)
        this.state = { dependenciesLoaded: false, search: false, searchText: '' }
        this.loadPosts = this.loadPosts.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSwipedLeft = this.handleSwipedLeft.bind(this)
        this.handleSwipedRight = this.handleSwipedRight.bind(this)
    }
    loadPosts({ postsType, isAutoFetch }) {
        const { fetchPosts, replaceTokenList } = this.props;
        return fetchPosts({ postsType, isAutoFetch })
        .catch(err => {
            __DEV__ && console.error(err)
            if (err.res.status === 401){
                replaceTokenList([])
                history.push('/settings')
            }
            throw err
        })
    }
    handleSearch({ searchText, actionType, newShowingPosts }) {
        const { updateShowingPosts, showingPosts } = this.props;

        switch (actionType) {
            case 'init':
                this.recordShowingPost = showingPosts
                this.setState({ search: true })
                break;
            case 'update':
                updateShowingPosts(newShowingPosts)
                this.setState({ searchText })
                break;
            case 'reset':
                updateShowingPosts(this.recordShowingPost)
                this.setState({ search: false, searchText: '' })
                break;
        }
    }
    handleSwipedLeft() {
        const { activeProviders } = this.props;
        let firstProvider = (
            activeProviders.indexOf('twitter') >= 0
                ? 'twitter'
            : activeProviders.indexOf('weibo') >= 0
                ? 'weibo'
            : 'instagram'
        );

        history.push(`/home/${firstProvider}`)
    }
    handleSwipedRight() {
        history.push('/settings')
    }
    handleWindowBlur() {
        // Pause All Video
        const videos = document.getElementsByTagName('video');

        [].forEach.call(videos, video => {
            video.pause()
        });
    }
    componentWillMount() {
        const { activeProviders, isInitLoad, resetState } = this.props;

        DependencyLoader(activeProviders)
        .then(() => this.setState({ dependenciesLoaded: true }))
        .catch((err) => __DEV__ && console.error(err))

        // Reset `timePointer`
        resetState();

        isInitLoad && this.loadPosts({ postsType: 'newPosts' })
        .then(() => {
            // Register Auto Fetch
            __DEV__ && console.log('[Auto Fetch]: Registered')
            this.autoFetchIntervalId = setInterval( () => {
                this.loadPosts({ postsType: 'newPosts', isAutoFetch: true })
            }, 1000 * 60 * 3)
            // Event
            window.addEventListener('blur', this.handleWindowBlur);
        })
    }
    componentWillUnmount() {
        // Reset `isInitLoad`
        this.props.resetState();
        document.title = '｜';
        // Unregister Auto Fetch
        __DEV__ && console.log('[Auto Fetch]: Unregistered')
        clearInterval(this.autoFetchIntervalId)
        // Event
        window.removeEventListener('blur', this.handleWindowBlur)
    }
    render() {
        const { newPosts, oldPosts, showingPosts, allPosts, isInitLoad, children } = this.props;
        const { dependenciesLoaded, search, searchText } = this.state;
        return (
            <Swipeable onSwipedLeft={this.handleSwipedLeft} onSwipedRight={this.handleSwipedRight}>
                <ScrollToTop target=".scrollTo--target" container=".oneline__wrapper" duration={700} />

                <div className="oneline__wrapper overflow--y">
                    <span className="scrollTo--target"></span>
                    {!search &&
                        <Spin
                            type="newPosts"
                            initLoad={isInitLoad || !dependenciesLoaded}
                            {...newPosts}
                            onClick={this.loadPosts.bind(this, { postsType: 'newPosts' })}
                        />
                    }
                    {dependenciesLoaded && showingPosts && !isInitLoad && (
                        <div>
                            <SearchLocal onChange={this.handleSearch} allPosts={allPosts.posts} />
                            <Timeline showingPosts={showingPosts} highlight={searchText} />
                        </div>
                    )}
                    {isInitLoad || !search
                        ? <Spin
                            type="oldPosts"
                            initLoad={isInitLoad || !dependenciesLoaded}
                            {...oldPosts}
                            onClick={this.loadPosts.bind(this, { postsType: 'oldPosts' })}
                        />
                        : null
                    }
                </div>
                <Transition>
                    {children}
                </Transition>
            </Swipeable>
        );
    }
}


// Export
export default connect(
    state => {
        const { activeProviders } = state.auth;
        const { newPosts, oldPosts, isInitLoad, showingPosts, allPosts } = state.timeline;
        return {
            activeProviders,

            newPosts,
            oldPosts,
            isInitLoad,
            showingPosts,
            allPosts,
        }
    },
    { resetState, fetchPosts, updateShowingPosts, replaceTokenList }
)(Home)