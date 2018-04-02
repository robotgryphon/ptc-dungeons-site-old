const html = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
      "app": './source/client/scripts/app.ts'
    },
    output: {
      path: __dirname + '/build/client',
      filename: 'scripts/[name].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
    plugins: [
      new html({
        template: "./source/client/index.html",
        inject: false
      })
    ]
  }