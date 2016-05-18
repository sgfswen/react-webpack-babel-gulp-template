const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  debug: true,

  entry: './src/main.js',
  output:{
    path: './dist',
    filename: 'bundle.js',
  },

  plugins: [
      new webpack.OldWatchingPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ],
  },
};
