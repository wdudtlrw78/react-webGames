const path = require('path');
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: './client.jsx'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers: ['> 1% in KR'],
                    },
                }],'@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties' , 'react-refresh/babel'],
            }
        }],
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new RefreshWebpackPlugin(), // hot-reloading
    ], //확장 프로그램

    output: {
        path: path.join(__dirname),
        filename: 'app.js',
    },

    devServer: {
        historyApiFallback: true,
        publicPath: '', 
        hot: true,
    },
}