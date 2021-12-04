const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const PAGES_DIR = './src/pug/pages';
let stack = [PAGES_DIR];
let directories = [];
while (stack.length > 0) {
  let dir = stack.shift();
  //console.log(dir);
  const dirs = fs.readdirSync(dir).filter(filename => fs.lstatSync(dir + '/' + filename).isDirectory());

  dirs.forEach(dir1 => {
    directories.push(dir + '/' + dir1);
    stack.push(dir + '/' + dir1);
  });
}

const PAGES = [];
directories.forEach(dir => {
  let pages = fs.readdirSync(dir).filter((fileName) => fileName.endsWith('.pug]'));
  pages.forEach(page => {
    PAGES.push(dir + '/' + page);
  });
});


module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: 'main.css' }),
    new HtmlWebpackPlugin({
      template: `src/index.pug`,
      filename: `./index.html`,
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${page}`,
          filename: `./pages/${page.replace(/\.pug/, '.html')}`,
        })
    ),
  ],

  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: { pretty: true },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },

  devServer: {
    open: true,
    host: 'localhost',
    port: 4646,
  },
}
