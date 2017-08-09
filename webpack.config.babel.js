import webpack from 'webpack'
import path from 'path'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const DEBUG = process.env.NODE_ENV != 'production'

export default {
    entry: {
        app: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8080,
        overlay: true,
        hot: true
    },
    devtool: DEBUG ? 'cheap-eval-source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.hbs$/,
                exclude: /node_modules/,
                loader: "handlebars-loader"
            }
        ]
    },
    plugins: DEBUG ? [
        new HtmlWebpackPlugin({
            title: "Start",
            template: "./src/index.hbs",
            filename: path.join(__dirname, "dist/index.html")
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                'dist/**/*.css',
                {
                    match: [
                        "**/*.hbs"
                    ],
                    fn: function(event, file){
                        if(event == 'change'){
                            const bs = require('browser-sync').get('bs-webpack-plugin')
                            bs.reload();
                        }

                    }
                }
            ],
            proxy: 'http://localhost:8080/'
        }, { reload: false })
    ] : [
        new HtmlWebpackPlugin({
            title: "Start",
            template: "./src/index.hbs",
            filename: path.join(__dirname, "dist/index.html")
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
}
