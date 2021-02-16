import React from 'react';

const FunctionTry = ({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try} / {tryInfo.result}</div>
        </li>
    )
}

export default FunctionTry;