import React from 'react';

import Icon from '../../../Icon';

export default class Star extends React.Component {
    constructor(props) {
        super(props)
        this.star = this.star.bind(this)
    }
    star() {
        // TODO
    }
    render() {
        const { id } = this.props;
        return (
            <button
                className="post-action tips--deep"
                type="button"
                onClick={this.star}
                style={ id ? null : { 'pointerEvents': 'none' } }
            >
                <Icon className="post-action__button" viewBox="0 0 26 26" name="star" data-star />
                <span className="post-action__count" />
            </button>
        );
    }
}