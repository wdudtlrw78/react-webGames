import React from 'react';

const TestTry = ({tryInfo}) => {
    console.log('tryInfo');
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    )
}

export default React.memo(TestTry);