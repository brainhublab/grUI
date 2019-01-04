var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'electron-renderer',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2)$/,
                use: 'file-loader'
            },
            // GLTF configuration: add this to rules
            {
                // match all .gltf files
                test: /\.(gltf|glb)$/,
                loader: 'gltf-loader-2'
            },
            {
                // here I match only IMAGE and BIN files under the gltf folder
                test: /gltf.*\.(bin|png|jpe?g|gif)$/,
                // or use url-loader if you would like to embed images in the source gltf
                loader: 'file-loader',
                options: {
                    // output folder for bin and image files, configure as needed
                    name: 'gltf/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            three$: 'three/build/three.min.js',
            'three/.*$': 'three',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'GR',
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            'THREE': 'three'
        })
    ],
}
