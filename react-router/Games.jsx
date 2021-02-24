import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
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
                <Route path="/game/:name" component={GameMatcher} /> {/* :앞에 붙은 이름들을 파라미터 줄여서 params라고 불리며 : 앞에 값은 동적으로 바뀐다
                예를 들어서 name에서 numberbaseball이 될 수 있고 lotto-generator가 될 수 있다. */}
            </div>
        </BrowserRouter>
    )
}

export default Games;