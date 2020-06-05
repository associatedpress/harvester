const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const portfinder = require('portfinder');
const args = require('yargs').default('proxy', '3000').argv;

portfinder.basePort = 8000;

const config = (env, argv, port) => ({
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
		extensions: ['.js', '.jsx'],
  },
  entry: path.resolve(__dirname, './src/js/main-app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  devServer: {
    compress: true,
    port,
    // open: true,
    contentBase: path.join(__dirname, 'public'),
    overlay: {
      errors: true,
      warnings: false,
    },
    proxy: {
      '/live-data/': {
        /**
         * Uncomment these lines (and comment out the rest of this object) to
         * serve live-data locally
         */
        target: `http://localhost:${args.proxy}`,
        pathRewrite: {'^/live-data' : ''},

        /**
         * Uncomment these lines (and comment out the rest of this object) to
         * pull live-data from production
         */
        //target: 'https://interactives.ap.org',
        //changeOrigin: true,
        //pathRewrite: {'^/live-data': '/protest-arrests-data-entry/live-data'},
      },
      '/assets/': {
        target: 'https://interactives.ap.org',
        changeOrigin: true,
      },
      '/api/': {
        target: 'http://localhost:3000',
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: true,
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                  browsers: 'last 2 versions',
                },
              }],
              '@babel/react',
            ],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /.*\.s?css$/,
        sideEffects: true,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[contenthash].[ext]',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[contenthash].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
});

module.exports = (env, argv) =>
  portfinder.getPortPromise()
    .then(port => config(env, argv, port));
