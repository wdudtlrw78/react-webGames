import React from 'react';
import { BrowserRouter, HashRouter, Route, Link, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            공통 레이아웃 {/*공통인 레이아웃*/}
            <Link to="/game/number-baseball?query=10&hello=momo&bye=react">숫자야구</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또생성기</Link>
            &nbsp;
            <Link to="/game/index">게임 매쳐</Link> {/*조건: 2 단어 이상 */}
            <div>
                <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
                <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
            </div>
        </BrowserRouter>
    )
}

export default Games;