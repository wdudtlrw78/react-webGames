import React, { memo } from 'react';

const FunctionTry = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try} / {tryInfo.result}</div>
        </li>
    )
});

export default FunctionTry;