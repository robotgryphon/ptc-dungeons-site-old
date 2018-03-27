const html = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
      "app": './source/scripts/app.ts',
      "quests": "./source/scripts/quests.ts"
    },
    output: {
      path: __dirname + '/public',
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
        template: "./source/index.html"
      })
    ]
  }