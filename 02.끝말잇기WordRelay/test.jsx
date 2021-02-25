const React = require('react');
const { useState, useRef } = React;

const TestWordRelay = () => {
    
    const [word, setWord] = useState('공부');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const onRefInput = useRef(null);

    const onSubmitForm = e => {
        e.preventDefault();
        
        if (word[word.length -1] === value[0]) {
            setResult('정답');
            setWord(value);
            setValue('');
            onRefInput.current.focus();
        } else {
            setResult('땡');
            setValue('');
            onRefInput.current.focus();
        }
    }

    const onChangeInput = e => {
        setValue(e.target.value);
    }

    return (
        <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
            <input ref={onRefInput} value={value} onChange={onChangeInput} />
            <button>입력</button>
        </form>
        <div>{result}</div>
        </>
    )
}

module.exports = TestWordRelay;