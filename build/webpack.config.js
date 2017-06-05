
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool:"#eval-source-map",
    entry: {
        'outputs/index': path.resolve(__dirname,'../app/entrys/user/index.js'),
        'outputs/common': path.resolve(__dirname,'../app/entrys/common.js'),
        'outputs/login': path.resolve(__dirname,'../app/entrys/admin/login.js'),
        'outputs/adminIndex': path.resolve(__dirname,'../app/entrys/admin/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../app/public'),
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@page-components': path.resolve(__dirname, '../app/view/page-compoments'),
            '@styles': path.resolve(__dirname, '../app/styles'),
            '@public': path.resolve(__dirname, '../app/public'),
            '@components': path.resolve(__dirname, '../app/components')
        }
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../app/public/'),
        port: 3000,
        historyApiFallback: true,
        proxy: {    //代理后台api服务器
            '/': {
                target: 'http://127.0.0.1:8081',
                secure: false
            }
        }
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll.json'),
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}