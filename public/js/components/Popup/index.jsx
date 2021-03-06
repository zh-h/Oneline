import React from 'react';
import Swipeable from 'react-swipeable';
import { browserHistory as history } from 'react-router';

import Transition from 'components/Utils/Transition';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.hidePopup = this.hidePopup.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSwipedLeft = this.handleSwipedLeft.bind(this);
        this.handleSwipedRight = this.handleSwipedRight.bind(this);
    }
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    hidePopup() {
        const { location } = this.props;
        history.push(/settings/.test(location.pathname) ? '/settings' : '/home');
    }
    handleKeyDown(e) {
        if (e.keyCode === 27) { this.hidePopup(); }
    }
    handleSwipedLeft(e) {
        e.stopPropagation();
        history.go();
    }
    handleSwipedRight(e) {
        e.stopPropagation();
        history.goBack();
    }
    render() {
        const children = this.props.children;
        const pathname = this.props.location.pathname;
        return (
            <Swipeable
                className="popup overflow--y"
                onSwipedLeft={this.handleSwipedLeft}
                onSwipedRight={this.handleSwipedRight}
                onClick={this.hidePopup}
            >
                {/(retweet|quote)/.test(pathname)
                    ? children
                    : <Transition>
                        {React.cloneElement(children, { key: pathname })}
                    </Transition>
                }
            </Swipeable>
        );
    }
}
