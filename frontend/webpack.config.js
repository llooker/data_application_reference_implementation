const path = require('path');
const Dotenv = require('dotenv-webpack');

const BACKEND_LOCATION = path.join(__dirname, '../backend/public/js');

module.exports = {
  mode: 'development',
  output: {
    filename: 'pbl.bundle.js',
    path: BACKEND_LOCATION,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: process.env.PBL_DEV_PORT || 3001,
    proxy: {
      '/api': ['http://localhost', process.env.PBL_PORT || '3000'].join(':')
    },
    historyApiFallback: true
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              "@babel/preset-env", 
              "@babel/preset-react",
              {
                'plugins': ["@babel/plugin-transform-runtime", '@babel/plugin-proposal-class-properties']
              }
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  plugins: [
    new Dotenv()
  ]
};