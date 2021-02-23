import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import NumberBaseball from '../03.숫자야구NumberBaseball/ClassNumberBaseball';
import RspClass from '../05.가위바위보RSP/RspClass';
import ClassLottoDraw from '../06.로또추첨기LottoDraw/ClassLottoDraw';

const Games = () => {
    return (
        <BrowserRouter>
            공통인 부분 {/*공통인 레이아웃*/}
            <Link to="/number-baseball">숫자야구</Link>
            &nbsp;
            <Link to="/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/lotto-generator">로또생성기</Link>
            <div>
                <Route path="/number-baseball" component={NumberBaseball} />
                <Route path="/rock-scissors-paper" component={RspClass} />
                <Route path="/lotto-generator" component={ClassLottoDraw} />
            </div>
        </BrowserRouter>
    )
}

export default Games;