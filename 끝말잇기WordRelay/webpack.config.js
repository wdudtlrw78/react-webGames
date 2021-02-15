const path = require('path'); // nodeJs에 지원 (경로 조작)

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'], // 만약 entry 안에 다양한 js, jsx를 합쳐줄 때 일일이 js, jsx입력해야하는 번거로움 때문에
    },

    entry: {
        app: ['./client'],
    }, // 입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env','@babel/preset-react'], //
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }],
    }, // 모듈  적용

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    } // 출력
};