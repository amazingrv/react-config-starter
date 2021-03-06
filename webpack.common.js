const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'lodash-es': 'lodash',
    },
    extensions: ['.js', '.jsx', '.json'],
    fallback: { crypto: false, fs: false },
  },
  performance: {
    hints: false,
  },
  stats: {
    colors: true,
  },
  plugins: [
    new ESLintPlugin({ extensions: ['js', 'jsx'], fix: true, quiet: true }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/favicon.ico',
      minify: false,
    }),
    new MomentLocalesPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
};
