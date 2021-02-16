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

- 함수형 컴포넌트에 State, ref, useEffect 추가한 것이 Hooks이다.

### WebPack

여러개의 자바스크립트 파일들을 전부 합쳐서 하나의 자바스크립트 파일로 만들어주는 기술이다.
또한 합치면서 바벨도 적용할 수 있고 쓸데없는 코드들(console.log())등 뺄수도 있다.

기본 config 설정

```
const path = require('path'); // nodeJs에 지원 (경로 조작)

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', 'jsx'], // 만약 entry 안에 다양한 js, jsx를 합쳐줄 때 일일이 js, jsx입력해야하는 번거로움 때문에
    },

    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        reules: [{
            test: /\.jsx/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                ], //
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    }, // 모듈  적용

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    } // 출력
};
```

- preset = plugin들의 모음

### npm

```
npm i react
npm i react-dom
npm i webpack
npm i webpack-cli
npm i -D @babel/core // 기본 바벨 최신문법
npm i -D @babel/preset-env // 본인 환경에 맞게 자동으로 옛날 문법으로 변경
npm i -D @babel/preset-react // React JSX로 변경
npm i -D babel-loader // 바벨이랑 웹팩 연결
```

### 후기

보통 react-create-app을 사용하지만 제로초님 강의는 웹팩을 a-z까지 접해볼 수 있어서 기본 원리를 알게되며 거부감이 사라졌다.
