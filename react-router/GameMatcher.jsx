import React, { Component } from 'react';
import NumberBaseball from '../03.숫자야구NumberBaseball/ClassNumberBaseball';
import RspClass from '../05.가위바위보RSP/RspClass';
import ClassLottoDraw from '../06.로또추첨기LottoDraw/ClassLottoDraw';

export default class GameMatcher extends Component {
    render() {
        let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
        console.log(urlSearchParams.get('hello'));
    if (this.props.match.params.name === 'number-baseball') {
      return <NumberBaseball />
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RspClass />
    } else if (this.props.match.params.name === 'lotto-generator') {
      return <ClassLottoDraw />
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    )
    }
}
