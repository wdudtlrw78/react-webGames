const path = require('path'); // nodeJs에 지원 (경로 조작)
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
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
        path: path.join(__dirname),
        filename: 'app.js'
    }, // 출력

    devServer: {
        historyApiFallback: true,
        publicPath: '', 
        hot: true,
    }
};