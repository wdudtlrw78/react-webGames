## React webGame-zeroCho

#### [제로초 웹 게임으로 배우는 리액트 강좌](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=1)

### React를 왜 쓰는가

1. Single Page Application 이며, App과 비슷하게 화면 이동시 깜빡임 없이 자연스럽게 넘어가는 방식이며 즉, 사용자 경험 인터페이스를 만들기 위한 JavaScript 라이브러리 입니다.

1. 데이터와 화면을 자동으로 일치시키기 위해

1. 유지보수와 재사용을 위한 Component

### JSX

- JSX(Javascript + XML)는 리액트에서 생김새를 정의할 때, 사용하는 문법입니다.\
- 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX를 Javascript로 변환을 해줍니다.
  ![](/images/1.png)

### 함수형 setState

setState는 비동기(asynchronous)입니다.

```
tihs.setState({
  value: this.state.value + 1;
});
tihs.setState({
  value: this.state.value + 1;
});
tihs.setState({
  value: this.state.value + 1;
});
// 새로운 value가 기존 value + 3이 아니라 +1일 수도 있다.
```

과거의 state값 을 현재의 state값으로 생성 할 때

```
this.setState((prevState) => {
  return {
    value: prevState.value + 1
  }
})
```

### 함수형 컴포넌트 React Hooks

함수형 컴포넌트에 State, ref, useEffect 추가한 것이 Hooks이다.
