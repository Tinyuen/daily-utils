const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();

module.exports = {
  mode: "development",
  entry: {
    app: path.resolve(cwd, 'examples/index.ts'),
  },
  output: {
    path: path.resolve(cwd, 'dist'),
    filename: "[name].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader?transpileOnly=true']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    stats: {
      colors: true,
      hash: true,
      version: true,
      timings: true,
      assets: true,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: true,
    },
    disableHostCheck: true,
    hot: true,
    port: 3334,
    host: 'localhost',
    open: false,
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(cwd, 'public/index.html'),
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
  ]
};

