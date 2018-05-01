const path = require('path');

const publicDir = path.join(__dirname, '/public');
module.exports = [
  {
    entry: [
      'babel-polyfill',
      './src/index.jsx',
    ],
    output: {
      path: publicDir,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env'],
        },
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: publicDir,
    },
    devtool: '#inline-source-map',
  },
];
