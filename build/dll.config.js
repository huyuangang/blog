const webpack = require('webpack')
const path = require('path')
const dlls = [
    'vue',
    'vue-router',
    'babel-polyfill'
]

module.exports = {
    output: {
        path: path.resolve(__dirname,'../app/public/outputs'),
        filename: '[name].js',
        library: '[name]'
    },
    entry:{
        dll:dlls
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.js'
      }
    },
    plugins:[
        new webpack.DllPlugin({
            path:'./build/dll.json',
            name:'[name]',
            context: __dirname
        }),
    ],
};