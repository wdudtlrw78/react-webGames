const React = require('react');
const ReactDom = require('react-dom');

const TestWordRelay = require('./test')

ReactDom.render(<TestWordRelay />, document.querySelector('#root'));