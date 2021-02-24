## React webGame-zeroCho

##### [제로초 웹 게임으로 배우는 리액트 강좌](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=1)

### 목차

1. [React를 왜 쓰는가](#react를-왜-쓰는가)
2. [JSX](#JSX)
3. [함수형 setState](#함수형-setstate)
4. [함수형 컴포넌트 React Hooks](#함수형-컴포넌트-react-hooks)
5. [불변성 지키기](#불변성-지키기)
6. [shouldComponentUpdate, PureComponent와 React.memo](#shouldcomponentupdate-purecomponent와-reactmemo)
7. [props와 state 연결](#props와-state-연결)
8. [useRef](#useref)
9. [LifeCycle Method (생명주기)](#lifecycle-method-생명주기)
10. [useEffect](#useeffect)
11. [useReducer](#usereducer)
12. [React Router](#react-router)
13. [ContextAPI](#context-api)
14. [WebPack](#webpack)
15. [npm](#npm)
16. [후기](#후기)

### React를 왜 쓰는가

1. Single Page Application 이며, App과 비슷하게 화면 이동시 깜빡임 없이 자연스럽게 넘어가는 방식이며 즉, 사용자 경험 인터페이스를 만들기 위한 JavaScript 라이브러리 입니다.

1. 데이터와 화면을 자동으로 일치시키기 위해

1. 유지보수와 재사용을 위한 Component

### JSX

- JSX(Javascript + XML)는 리액트에서 생김새를 정의할 때, 사용하는 문법입니다.
- 리액트 컴포넌트 파일에서 XML 형태로 코드를 작성하면 babel 이 JSX를 Javascript로 변환을 해줍니다.
  ![](/images/1.png)

### 함수형 setState

- setState는 비동기(asynchronous)입니다.

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

### 불변성 지키기

- 배열, 객체에 변화를 줄 때 불변성을 지켜줘야 한다.
- `push`, `splice`, `sort` 등의 함수는 지양해야한다. 만약 사용해야 한다면, 기존의 배열을 한 번 복사하고 나서 사용하자
- 불변성 지키면서 배열에 새 항목 추가하는 방법
  - spread 연산자
  - concat 함수

### shouldComponentUpdate, PureComponent와 React.memo

##### 리액트 성능 향상

- state랑 props가 바뀌어야 렌더링이 일어난다.
  하지만, setState({}) 빈 값을 호출해도 렌더링이 일어나는 현상이 발생한다.

- point - 무언가가 바뀌는 것이 없으면 렌더링이 일어나지 않게 해야한다.

```
shouldComponentUpdate(nextProps, nextState, nextCountext) {
        if (this.state.counter !== nextState.counter) {
            return true;
        }
        return false;
    }
```

또는 좀 더 편한 방법으로는 PureComponent와 React.memo가 있다.
`class Test extends PureComponent` </br>
`PureComponent`는 `shouldComponentUpdate`의 return 값이 true일지 false일지 자동으로 구현해주는 컴포넌트이다. </br>
HOW?

```
class Test extends PureComponent {
    state = {
        counter: 0,
        string: 'hello',
        number: 1,
        boolean: true,
        object: {},
        array: [],
    }
```

state 내부의 값 들이 변경 되었는지 아닌지 그것을 보고 판단한다. 하지만 단점이 있다면
` object``array ` 객체나 배열같은 복잡한 구조 (참조 관계가 있는 구조) PureComponent도 어려워 한다.

```
onClick = () => {
        const array = this.state.array;
        array.push(1);
        this.state.array.push(5)
        this.setState({
            array: array,
        });
    };
```

예를 들어 위의 예제는 `array`가 변경돠어서 렌더링이 일어나야 하지만 렌더링이 일어나지 않는다. 왜냐하면 `array = array` 가 `true`라서 변경되는 값이 없어서 렌더링이 없는 현상 일어난다. 그래서 항상 `spread` 연산자로 기존 array 펼치고 새로운 array 값을 넣어야한다.

##### Point

`PureComponent`와 `React.memo`는 `props`가 변화가 없으면 일정한 결과를 리턴하므로 다시 렌더링 하지 않는다. 자식이 모두 PureComponent-> 부모도 PureComponent 대상이 될 수 있으며 반대로 부모가 PureComponent-> 자식이 모두 PureComponent 대상이 될 수 있다.

```
onClick = () => {
        const array = this.state.array;
        array.push(1);
        this.setState({
          array: [...this.state.array, 1]
        })
        });
    };
```

주의해야 할 점은 state 안의 값을 `array: [{{3}}]` 배열안의 객체 또 그 안에 객체 이런식의 객체구조는 좋지 않아서 사용하지 말자.

### props와 state 연결

- 부모로 부터 받은 `props`는 값 변경 불가능하다.

```
const FunctionTry = memo(({ tryInfo }) => {
    tryInfo.try = 'Hello'; // X
    return (
        <li>
            <div>{tryInfo.try} / {tryInfo.result}</div>
        </li>
    )
});
```

- `porps`는 부모에서 변경해주어야 한다.
- 하지만 실무에서 등 부모로 부터 받은 `props`를 변경해주어야 하는 경우가 생긴다.
  - props를 state 에 넣어준다. 그래야 부모한테 영향을 미치지 않는다.

```
const FunctionTry = memo(({ tryInfo }) => {
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('1');
    }

    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{result}</div>
        </li>
    )
});
```

### useRef

- useRef) current로 접근해야 하며 값이 변경돼도 렌더링이 되지않음
- useState) 값이 변경되면 렌더링이 됨

### LifeCycle Method (생명주기)

- 브라우저상에 나타나고, 업데이트되고, 사라지게 될 때 호출되는 메서드이다.
  ![](./images/cNfpEph.png)<br>
  출처: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
  <br>
- `class`: `constructor` -> `render` -> `ref` -> `componentDidMount` -> ` setState` or `props ` 바뀔 때 -> `shouldComponentUpdate`(true) -> `render` -> `componentDidupdate`(리렌더링 후)
- 부모가 나를 제거했을 때 -> `componentWillUnmount` -> 소멸
  <br>
- `componentDidMount()` : 컴포넌트가 첫 렌더링된 후, 비동기 요청(axios, fetch, DOM 속성 읽거나 변경등)을 많이 한다.

- `componentDidUpdate()` : 리렌더링 후 화면에 원하는 변화가 모두 반영되고 난 후 호출

- `componentWillUnmount()` : 컴포넌트가 제거되기 직전에 호출 (DOM에 직접 등록했었던 이벤트 제거, clearTimeout 제거와 같은 비동기 요청 정리한다.)

### useEffect

```
useEffect(() => { // componentDidMount, componentDidUpdate 역할 (1대1 대응은 아님)
    return () => {} // componentWillUnmount 역할
}, []); // []은 빈 배열이면 componentDidMount와 동일하고 요소가 있으면 componentDidMount랑 DidUpdate 둘다 수행
```

- Class와 Hooks의 LifeCycle가 다른방식으로 동작한다.
- Class의 경우 가로 방식으로 작동한다.
- Hooks의 경우 세로 방식으로 작동한다.

##### example

| -                    | state 1 | state 2 | state 3 |
| -------------------- | :-----: | :-----: | :-----: |
| componentDidMount    |    -    |    -    |    -    |
| componentDidUpdate   |    -    |    -    |    -    |
| componentWillUnmount |    -    |    -    |    -    |

```
componentDidMount() {
  this.setState({
    state1 : 3,
    state2 : 1,
    state3 : 2,
  })
}

useEffect({
  setState1();
  setState2();
}, [state1, state2]);

useEffact({
  setState3();
}, [state3])

// componentDidUpdate만 하고 싶을때, DidMount X (DidMount 실행은 되지만 아무것도 하지 않는다.)
const mounted = useRef(false);
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    // ajax
  }
}, [바뀌는 값]) // 바뀌는 값에 따라서 else 부분 실행
```

### useReducer

- state들이 점점 많아지면 관리하기가 번거롭다. 그래서 하나의 state와 setState로 통일하는 것이 useReducer 개념이다.
- `Redux`에서는 동기적으로 실행되지만 `useReducer`에서는 **비동기적으로** 실행되는 차이점이 있다.

### Context API

- 만약 3개 이상의 컴포넌트를 거쳐서 전달 해야 하는 일이 발생한다면 번거롭기 때문에 Context API와 dispatch를 함께 사용하면 복잡한 구조를 해결 할 수 있다.

##### reducer, action, dispatch의 관계

- state가 있으면 직접 건드리거나 변경할 수 가 없다.
- state 변경하고 싶으면 이벤트가 실행 될 때 `action`을 `dispath`해서 state를 변경해야한다.
- state를 어떻게 바꾸는지는 `reducer`에서 기록을 한다.

### React Router

- Router는 가상의 페이지이며 눈속임이다.
- 실제로 페이지가 바뀌는 것이 아니라 바뀌는 척 하는 것이다.

#### 1. Link와 브라우저 라우터(BrowserRouter)

- `a`Tag 대신 `Link`컴포넌트로 `<Link to="/number-baseball">숫자야구</Link>`로 불러준다.

```
<BrowserRouter>
  {*/공통 레이아웃 영역*/}
  <Link to="/number-baseball">숫자야구</Link>
    <div>
      <Route path="/number-baseball" component={FunctionNumberBaseball} />
    </div>
</BrowserRouter>
```

- Hooks 문제점 Error 3. You might have more than one copy of React in the same app
- 이유 2개의 import React 대상이 다르면 문제가 되기 때문이다.
- Class에서는 문제가 안되기 때문에 Class로 변경해주면 제대로 import가 된다.
- webpack.config에서 `plugins: ['@babel/plugin-proposal-class-properties']` 설치해주어야 Class 컴포넌트가 호환된다.
- historyApiFallBack: 히스토리 API를 사용하는 SPA 개발시 설정한다. 404가 발생하면 index.html로 리다이렉트한다.

```
devServer: {
        historyApiFallback: true,
        publicPath: '',
        hot: true,
    },
```

#### 2. 해시라우터, params, withRouter

- 주소창에 http://localhost:8080/#/number-baseball 중간에 # 확인할 수 있다.
- 브라우저 라우터는 주소창이 깔끔한 대신 새로고침 하면 서버에 요청(브라우저 모름)이가서 모른다고 답한다.(서버쪽의 셋팅을 했다는 전제하에 검색 엔진에게 알려준다.) 예를 들어 검색 엔진에게 알려주려면 가위바위보 , 로또추첨기, 숫자야구의 페이지가 존재한다는 것을 서버쪽에서 셋팅을 해야된다.
- 해시라우터는 새로고침해도 동작이 된다. 이유는 # 뒤에 부분이 브라우저만(서버는 모름) 아는부분이다. 반대로 브라우저 라우터는 뒤에 부분을 인식을 못한다.
- 단점은 SEO [search engine optimization](https://ko.wikipedia.org/wiki/%EA%B2%80%EC%83%89_%EC%97%94%EC%A7%84_%EC%B5%9C%EC%A0%81%ED%99%94) 검색 엔진 최적화할 때 서버에서 모른다고 응답하기 때문에 검색 엔진에 안뜬다. 그래서 실무에선 검색 엔진이 중요해서 잘 쓰이지 않는다.

**만약 Route가 많아져서 관리하기 힘들 때 다이나믹 라우트 매칭을 이용한다. (동적 라우트 매칭)**

- `path`의 :앞에 붙은 이름들을 파라미터 줄여서 params라고 불리며 : 앞에 값은 *동적*으로 바뀐다. 예를 들어서 name에서 numberbaseball이 될 수 있고 lotto-generator가 될 수 있다.

```
        <BrowserRouter>
            공통인 부분 {/*공통인 레이아웃*/}
            <Link to="/number-baseball">숫자야구</Link>
            &nbsp;
            <Link to="/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/lotto-generator">로또생성기</Link>
            &nbsp;
            <Link to="/game/index">게임 매쳐</Link> {/*조건: 2 단어 이상 */}
            <div>
                <Route path="/number-baseball" component={NumberBaseball} />
                <Route path="/rock-scissors-paper" component={RspClass} />
                <Route path="/lotto-generator" component={ClassLottoDraw} />
                <Route path="/game/:name" component={GameMatcher} />
            </div>
        </BrowserRouter>
```

동적 라우트 매칭을 이용하면 다음과 같이 하나의 라우트로 관리 할 수 있다.

```
        <BrowserRouter>
            공통인 부분 {/*공통인 레이아웃*/}
            <Link to="/game/number-baseball">숫자야구</Link>
            &nbsp;
            <Link to="/game/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/game/lotto-generator">로또생성기</Link>
            &nbsp;
            <Link to="/game/index">게임 매쳐</Link> {/*조건: 2 단어 이상 */}
            <div>
                <Route path="/game/:name" component={GameMatcher} />
            </div>
        </BrowserRouter>
```

- 위의 GameMatcher에서 Route가 component의 props안에 *history, location, match*를 넣어준다.
- 만약 연결이 안되어있는 컴포넌트에서 history, location, match를 쓰고 싶으면 *withRouter*를 import 받아와서 HOC 패턴으로 감싸주면 된다.
  `export default withRouter(GameMatcher);`

#### 3.location, match, history

- history: 페이지 눈속임을 위해 메서드들을 제공한다. 페이지를 넘나드는 내역들을 간직하고 있다. 내장되어있는 함수들이 있어서 프로그래밍적으로 부를 수 있다. (push, go, goBack, goForward 등)
- match: match안에 params 정보가 들어있다. params로 분기처리 등 할 수 있다.
- location: 현재 주소 정보를 가지고 있다.

- 브라우저 자체에서 제공해주는 history.pushState('', '', '/주소') API가 있다. 이 API로 리액트 라우터가 활용(의존관계)한거지만 우리는 리액트 라우터의 history 즉, this.props.history를 사용해야 한다.

#### 4.쿼리스트링과 URLSearchParms

- 쿼리스트링 : `<Link to="/game/number-baseball?query=10&hello=momo&bye=react">숫자야구</Link>` ?query=key=vaule 데이터 쌍이 여러개인 경우는 &로 구분한다. 이런식으로 주소에다가 데이터를 붙여줄 수 있다. 전달하면 서버에서도 응답한다.

**URLSearchParams()로 파싱하기**

```
let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1)); // slice(1) = ? slice
        console.log(urlSearchParams.get('hello')); // momo
```

#### 5.render props, switch, exact

- render props: `<Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />` props 전달
- Switch : Switch태그로 감싸고 있는 Route중에서 일치하는 페이지 빼고 나머지 페이지들은 렌더링 되지 않는다.
- exact : path 주소가 정확하게 일치하는 경우만 렌더링 될 수 있게 한다. 무슨 말이냐면, Switch에서는 동시에 라우터 여러개 막기 위해서 사용하는데 조심해야 할 점은 상위 주소랑 하위 주소가 있는 경우에는 상위주소의 / 도 일치하는 걸로 알아차려서 렌더링이 같이 된다.

```
<Switch>
  <Route path="/" render={(props) => <GameMatcher {...props} />} />
  <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
</Switch>
```

- exact 붙인 경우 실제 / 값 만 렌더링 된다.

```
<Switch>
  <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
  <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
</Switch>
```

- [Hooks Route 연동 참조](https://reactrouter.com/web/`api/Hooks/usehistory)

### WebPack

- 여러개의 자바스크립트 파일들을 전부 합쳐서 하나의 자바스크립트 파일로 만들어주는 기술이다.
  또한 합치면서 바벨도 적용할 수 있고 쓸데없는 코드들(console.log())등 뺄수도 있다.

기본 config 설정

```
const path = require('path'); // nodeJs에 지원 (경로 조작)
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'], // 만약 entry 안에 다양한 js, jsx를 합쳐줄 때 일일이 js, jsx입력해야하는 번거로움 때문에
    },

    entry: {
        app: './client',
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 1% in KR'], // github.com/browerslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ], //
                plugins: ['@babel/plugin-proposal-class-properties' , 'react-refresh/babel'],
            }
        }],
    }, // 모듈 적용

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin(), // hot-reloading
    ], //확장 프로그램

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, // 출력

    devServer: {
        publicPath: '/dist', // 가상 경로 app.use('/dist', express.static(__dirname, '/dist'))
        hot: true,
    }
};
```

- preset = plugin들의 모음

- hotReLoding = 브라우저 새로고침하면 기존 데이터 다 날라가는 반면에, 핫리로딩을 적용하면 기존 데이터 유지하면서 화면을 변경해준다.

### import와 require

- require = Node의 Module 시스템이다.
- exports되는 게 객체나 배열이면 구조 분해할 수 있다.
- ES2015 module 문법 `export const hello = 'hello';` // `import { hello };` // 노드 module문법 = `export.hello = 'hello'`
- ES2015 module 문법 `export default NumberBaseball;` `import NumberBaseball;` // 노드 module문법 = `module.exports = NumberBaseball;`
- React정도는 import와 requrie 둘다 어느정도는 호환된다. 깊게들어가면 다르다. require(노드문법)은 default를 별도의 객체로 처리한다.
- 기본적으로 Node로 Webpack을 돌린다. Node에서는 노드 module문법으로 돌아간다. 하지만, 바벨이 있어서 ES2015 module문법으로 변경해준다. (webpack에서는 노드 문법 require으로 써야한다. )
- import는 정적 임포트, require는 동적 임포트라는 차이가 있다. import는 항상 파일 상단에, require는 파일 아무데서나 쓸 수 있다.

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
npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D // 핫리로딩
npm i -D webpack-dev-server // 데브서브
npm i react-router-dom // web 만약 app이면 native 자동으로 react-router 설치
```

### 후기

보통 react-create-app을 사용하지만 제로초님 강의는 웹팩을 a-z까지 접해볼 수 있어서 기본 원리를 배운점이 인상 깊었고, 기본적으로 react-dom, 바벨 등을 왜 쓰는지 강의 전반적으로 **필요성**을 알게해준 점이 유익했다. React를 배웠지만 안다고 착각해선 안되고 직접 적용해보면서 반복하며 내 것으로 만드는 것이 중요한 부분이다.
