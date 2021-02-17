import React, { PureComponent } from 'react';

class ClassTry extends PureComponent {
    render() {
        const { tryInfo } = this.props;
        return (
            <li>
                <div>{tryInfo.try}</div>
                <div>{tryInfo.result}</div>
            </li>
        )
    }
}

export default ClassTry;