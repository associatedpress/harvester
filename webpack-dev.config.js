const webpack = require('webpack')
const path = require('path')
const portfinder = require('portfinder')
const glob = require('glob')
const args = require('yargs').default('proxy', '3000').argv

const backendUrlPatterns = [
  '/',
  '/d/',
  '/forms/',
  '/api/',
  '/assets/',
  '/auth/',
]

const config = (env, argv, port) => ({
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
		extensions: ['.js', '.jsx'],
  },
  entry: glob.sync(`${path.resolve(__dirname, './src/js')}/*-app.js`).reduce((entry, file) => {
    const name = path.basename(file).slice(0, -1 * '-app.js'.length)
    return { ...entry, [name]: file }
  }, {}),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  devServer: {
    compress: true,
    port,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    overlay: {
      errors: true,
      warnings: false,
    },
    proxy: backendUrlPatterns.reduce((proxy, url) => {
      return { ...proxy, [url]: `http://localhost:${args.proxy}` }
    }, {}),
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
            name: '[name].[contenthash].[ext]',
            outputPath: 'fonts',
            publicPath: '/fonts/',
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash].[ext]',
            outputPath: 'images',
            publicPath: '/images/',
          },
        }],
      },
    ],
  },
  plugins: [],
})

module.exports = config
