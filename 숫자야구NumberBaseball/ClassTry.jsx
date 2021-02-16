import React, { Component } from 'react';

class ClassTry extends Component {
    render() {
        return (
            <li>
                <div>{this.props.tryInfo.try} / {this.props.tryInfo.result}</div>
            </li>
        )
    }
}

export default ClassTry;