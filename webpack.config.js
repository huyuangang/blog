 
var webpack = require('webpack');


module.exports = {
    entry:{
      'index':'./entrys/user/index.js',
      'adminIndex': './entrys/admin/index.js',
      'newArticle':'./entrys/admin/new-article.js'
    },
    output:{
        path:'./app/public/outputs/',
        filename:'[name].js'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },{
                test: /\.jade$/,
                loader: 'jade'
            },{
                test: /\.vue/,
                loader: 'vue-loader'
            }
        ]     
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
        }
    }
}