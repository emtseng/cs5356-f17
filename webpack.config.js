const path = require('path');
const ROOT = path.resolve(__dirname, 'src/main/resources/assets');
const SRC = path.resolve(ROOT, 'jsx');
const CSS_SRC = path.resolve(ROOT, 'scss');
const DEST = path.resolve(ROOT, 'public');

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./jsx/index.js', './scss/index.scss'],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: ROOT,
  devtool: 'source-map',
  output: {
    path: DEST,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ]
};
