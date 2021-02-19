## React webGame-zeroCho

#### [제로초 웹 게임으로 배우는 리액트 강좌](https://www.youtube.com/watch?v=V3QsSrldHqI&list=PLcqDmjxt30RtqbStQqk-eYMK8N-1SYIFn&index=1)

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

#### 리액트 성능 향상

- state랑 props가 바뀌어야 랜더링이 일어난다.
  하지만, setState({}) 빈 값을 호출해도 랜더링이 일어나는 현상이 발생한다.

- 무언가가 바뀌는 것이 없으면 랜더링이 일어나지 않게 해야한다.

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

예를 들어 위의 예제는 `array`가 변경돠어서 랜더링이 일어나야 하지만 랜더링이 일어나지 않는다. 왜냐하면 `array = array` 가 `true`라서 변경되는 값이 없어서 랜더링이 없는 현상 일어난다. 그래서 항상 `spread` 연산자로 기존 array 펼치고 새로운 array 값을 넣어야한다.

##### Point

`PureComponent`와 `React.memo`는 `props`가 변화가 없으면 일정한 결과를 리턴하므로 다시 랜더링 하지 않는다. 자식이 모두 PureComponent-> 부모도 PureComponent 대상이 될 수 있으며 반대로 부모가 PureComponent-> 자식이 모두 PureComponent 대상이 될 수 있다.

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

- useRef) current로 접근해야 하며 값이 변경돼도 랜더링이 되지않음
- useState) 값이 변경되면 랜더링이 됨

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
```

### 후기

보통 react-create-app을 사용하지만 제로초님 강의는 웹팩을 a-z까지 접해볼 수 있어서 기본 원리를 알게되며 거부감이 사라졌다.
