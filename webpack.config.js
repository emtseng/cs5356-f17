var path = require('path');
var ROOT = path.resolve(__dirname, 'src/main/resources/assets');
var SRC = path.resolve(ROOT, 'jsx');
var DEST = path.resolve(ROOT, 'js');

module.exports = {
  entry: SRC,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: DEST,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        },
        exclude: /(node_modules)/
      }
    ]
  }
};
