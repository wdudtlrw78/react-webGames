import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
  //   useMemo = 값 을 저장(기억)
  //   useCallback = 함수를 저장(기억)
import FunctionBall from './FunctionBall';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const HooksLottoDraw = () => {
    // Hooks Tip
    // Hooks에서는 순서가 매우 중요하기 때문에 중간에 값이 바뀌면 안된다.
    // Hooks에서는 항상 최상위로 빼줘서 실행순서가 같게끔 해준다.
    // 조건문 안에 절대 넣으면 안되고 함수나 반복문 안에도 웬만하면 넣지 않는다.
    // useEffect, useCallback, useMemo 안에서 useState 값 이 어떻게 바뀔지 모르기 떄문에 지양하자.
    const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo = 값 을 기억한다 [] 안의 값이 바뀔 때 까지
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    
    useEffect(() => {
        console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
        timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
        setBonus(winNumbers[6]);
        setRedo(true);
    }, 7000);
    return () => {
        timeouts.current.forEach((v) => {
        clearTimeout(v);
        });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

  const onClickRedo = useCallback(() => { // useCallback = 함수를 기억한다 [] 안의 값이 바뀔 때 까지 (컴포넌트 안에 넣을 것들은 useCallback)
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // 기억을 너무 잘해서 기존 console(winNumbers) 값 이 바뀌지가 않기 때문에, [] 안에 변경되는 해당 state를 넣어줘야 한다.

    return (
    <>
        <div>당첨 숫자</div>
        <div id="결과창">
        {winBalls.map((v) => <FunctionBall key={v} number={v} />)}
        </div>
        <div>보너스!</div>
        {bonus && <FunctionBall number={bonus} onClick={onClickRedo} />}
        {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
    );
};

export default HooksLottoDraw;