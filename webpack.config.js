const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
  entry: ['./assets/js/index.js', './assets/scss/main.scss'],
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new FileManagerPlugin({
      onEnd: [
        {
          copy: [
            {
              source: path.join(__dirname, 'index.html'),
              destination: path.join(__dirname, 'dist/index.html'),
            },
            {
              source: path.join(__dirname, 'assets/img'),
              destination: path.join(__dirname, 'dist/img'),
            },
            {
              source: path.join(__dirname, 'assets/favicon'),
              destination: path.join(__dirname, 'dist/favicon'),
            },
          ],
        },
      ],
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]',
      },
      {
        test: /\.(jpg|jpeg|gif|png|mp4)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024',
      },
    ],
  },
};
