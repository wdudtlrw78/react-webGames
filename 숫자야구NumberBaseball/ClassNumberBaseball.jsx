import React, { PureComponent, createRef } from 'react';
import ClassTry from './ClassTry';

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

class NumberBaseball extends PureComponent {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    }

    onSubmitForm = (e) => {
        const { answer, value, tries } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!!',
                    tries: [...prevState.tries, {try: value, result: '홈런!'}],
                }
            })
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
            this.inputRef.current.focus();
        } else {
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) {
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
                this.inputRef.current.focus();
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike}스트라이크 ${ball}볼입니다.`}],
                        value: '',
                    }
                });
                
                this.inputRef.current.focus();
            }
        } 
    }

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        })
    }

    
    inputRef = createRef();

    render() {
        const { result, value, tries } = this.state;
        return (
            <>
            <h1>{result}</h1>
            <form onSubmit={this.onSubmitForm}>
                <input maxLength={4} ref={this.inputRef} onChange={this.onChangeInput} value={value}/>
            </form>
            <div>시도: {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <ClassTry key={`${i + 1}차 시도:`} tryInfo={v}/>
                    )
                })}
            </ul>
            </>
        )
    }
}

export default NumberBaseball;