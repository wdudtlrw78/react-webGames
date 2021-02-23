const path = require('path');
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
                    targets: {browsers: ['last 2 chrome versions']},
                    debug: true,
                }], '@babel/preset-react'],
                plugins: ['react-refresh/babel'],
            },
        }],
    },

    output: {
        path: path.join(__dirname),
        filename: 'app.js',
    },

    plugins: [
        new RefreshWebpackPlugin(), // hot-reloading
    ],

    devServer: {
        publicPath: '', 
        hot: true,
    },
}