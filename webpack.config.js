const { EnvironmentPlugin } = require('webpack')

module.exports = {
  entry: {
    './public/dist/index.js': './src/client/index.js',
  },
  output: {
    path: __dirname,
    filename: '[name]'
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  node: {
    __filename: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\//,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
}
