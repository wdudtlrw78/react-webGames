import React from 'react';
import { useState, useRef } from 'react';
import FunctionTry from './FunctionTry';

function getNumbers() {
    const candidate = Array(9).fill().map((v, i) => i + 1);
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const randomNumber = candidate.splice(Math.floor(Math.random() * [candidate.length - i]), 1)[0];
        array.push(randomNumber);
    }
    console.log(array);
    return array;
}

const FunctionNumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);
    const refInput = useRef(null);
    
    const onSubmitForm = e => {
        e.preventDefault();
        if (value === answer.join('')) {
            setResult('홈런!!');
            setTries((prevState) => {
                return [...prevState, {try: value, result: '홈런!'}];
            });
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

            refInput.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`)
                setValue('');
                setAnswer(getNumbers());
                setTries([]);

                refInput.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevState) => [...prevState, { try: value, result: `${strike}스트라이크 ${ball}볼 입니다.`}])
                setValue('');

                refInput.current.focus();
            }
        }
    }

    const onChangeInput = e => {
        console.log(answer);
        setValue(e.target.value);
    }
    return (
        <>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
            <input maxLength={4} ref={refInput} onChange={onChangeInput} value={value} />
            <button>입력!</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
            {tries.map((v, i) => {
                return (
                    <FunctionTry key={`${i + 1}차 시도`} tryInfo={v} />
                )
            })}
        </ul>
        </>
    )
}

export default FunctionNumberBaseball;