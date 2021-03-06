/* eslint global-require: 0 */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'public/js');
const ENTRY_PATH = path.resolve(APP_PATH, 'entry');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public/dist');

module.exports = {
    entry: {
        app  : [path.resolve(ENTRY_PATH, 'app'), 'webpack-hot-middleware/client'],
        share: [path.resolve(ENTRY_PATH, 'share'), 'webpack-hot-middleware/client'],
    },
    output: {
        path      : BUILD_PATH,
        publicPath: '/public/dist/',
        filename  : '[name].[hash].js',
    },
    module: {
        loaders: [
            {
                test   : /\.jsx?$/,
                include: APP_PATH,
                // exclude: /(node_modules|bower_components)/,
                loaders: ['babel'],
            },
            { test: /\.json$/, loader: 'json' },
            { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
            {
                test  : /\.svg$/,
                loader: 'svg-sprite',
                query : {
                    prefixize: false,
                },
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.coffee'],
        alias     : {
            components: path.resolve(APP_PATH, 'components'),
            state     : path.resolve(APP_PATH, 'state'),
            utils     : path.resolve(APP_PATH, 'utils'),
            dist      : path.resolve(ROOT_PATH, 'public/dist'),
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__               : process.env.NODE_ENV === 'development' || false,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name    : 'common',
            filename: 'common.[hash].js',
        }),
        new AssetsPlugin({
            filename: 'assets.manifest.dev.json',
            path    : BUILD_PATH,
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    postcss: wp => {
        return [
            require('postcss-import')({
                path           : ['public/css'],
                addDependencyTo: wp,
            }),
            require('postcss-nested'),
            require('postcss-short'),
            require('postcss-assets')({ loadPaths: ['public/img/assets'] }),
            require('postcss-cssnext')({
                autoprefixer: true,
            }),
            require('css-mqpacker'),
            // require('cssnano'),
        ];
    },
};
