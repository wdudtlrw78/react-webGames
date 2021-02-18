import React, { Component } from 'react';



class ReseponseCheckClass extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요!',
        result: [],
    }

    startTime;
    endTime;
    timeOut;

    onClickScreen = () => {
        const { state, result, message } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요!',
            })
            this.timeOut = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭하세요!',
                })
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000)
        } else if (state === 'ready') {
            clearTimeout(this.timeOut);
            this.setState({
                state: 'waiting',
                message: '너무 성급하시군요! 초록색이 된 후에 클릭하세요.'
            })
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                state: 'waiting',
                message: '클릭해서 시작하세요!',
                result: [...prevState.result, this.endTime - this.startTime],
            }})
        }
    }

    timeAverage = () => {
        const { result } = this.state;
        return result.length === 0 ? null : <div>평균시간: {result.reduce((acc, current) => (acc + current) / result.length)}</div>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
            <div id="screen" className={state} onClick={this.onClickScreen}>{message}</div>
            <div>{this.timeAverage()}</div>
            </>
        )
    }
}

export default ReseponseCheckClass;