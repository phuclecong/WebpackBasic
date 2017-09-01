const path = require('path');
const vendorLibs = ['react'];

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('styles.[chunkhash].css');

const webpack = require('webpack');
const commonChunk = new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest']
})

const HtmlWebpackPlugin = require('html-webpack-plugin');
const html = new HtmlWebpackPlugin({
    template: 'src/index.html',
    "assets": {
        "style"  : "styles.[chunkHash].css",
    }
});

const config = {
    entry: {
        bundle: './src/index.js',
        vendor: vendorLibs
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],
            //     exclude: /node_modules/
            // },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader']),
                exclude: /node_modules/
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }

        ]
    },

    plugins: [
        extractCSS,
        commonChunk,
        html
    ],

    devtool: 'source-map'
}

module.exports = config;
