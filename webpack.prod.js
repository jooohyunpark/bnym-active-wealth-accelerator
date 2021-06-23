const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
const pjson = require('./package.json')
const PROJECT_PATH = pjson.path
const ROOT_URL = pjson.root

module.exports = {
  mode: 'production',
  performance: {
    hints: 'warning',
    maxAssetSize: 200000
  },
  entry: {
    index: './src/index.js',
    form: './src/pages/form/index.js',
    ['thank-you']: './src/pages/thank-you/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/js/awa/[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })]
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/awa/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: PROJECT_PATH.substring(1) + 'index.html',
      chunks: ['index'],
      meta: {
        'og:url': {
          property: 'og:url',
          content: ROOT_URL + PROJECT_PATH
        },
        'og:title': {
          property: 'og:title',
          content: 'BNY Mellon Active Wealth Accelerator: How to Make the Most of Your Wealth'
        },
        'og:description': {
          property: 'og:description',
          content:
            'Do you want to make the most of your investments? Through a series of simple questions, the BNY Mellon Active Wealth Accelerator, can help you assess where you stand financially, and provide insights for how you can make the most of your investments.'
        },
        'og:type': { property: 'og:type', content: 'website' },
        'og:site_name': { property: 'og:type', content: 'BNY Mellon Active Wealth Accelerator' },
        'og:image': {
          property: 'og:image',
          content: ROOT_URL + '/assets/img/awa/bnym_active_wealth_tool_social.png'
        },
        'og:image:alt': {
          property: 'og:image:alt',
          content: 'A long line of windmills curving around a hilltop at sunset.'
        },
        'og:image:width': {
          property: 'og:image:width',
          content: 1200
        },
        'og:image:height': {
          property: 'og:image:height',
          content: 630
        },
        'og:locale': {
          property: 'og:locale',
          content: 'en_US'
        },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': {
          name: 'twitter:title',
          content: 'BNY Mellon Active Wealth Accelerator: How to Make the Most of Your Wealth'
        },
        'twitter:description': {
          name: 'twitter:description',
          content:
            'Do you want to make the most of your investments? Through a series of simple questions, the BNY Mellon Active Wealth Accelerator can help you assess where you stand financially, and provide insights for how you can make the most of your investments.'
        },
        'twitter:image': {
          name: 'twitter:image',
          content: ROOT_URL + '/assets/img/awa/bnym_active_wealth_tool_social.png'
        },
        'twitter:image:alt': {
          name: 'twitter:image:alt',
          content: 'A long line of windmills curving around a hilltop at sunset.'
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/form/index.html',
      filename: PROJECT_PATH.substring(1) + 'form.html',
      chunks: ['form']
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/thank-you/index.html',
      filename: PROJECT_PATH.substring(1) + 'thank-you.html',
      chunks: ['thank-you']
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/img/awa/',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/awa/'
            }
          }
        ]
      }
    ]
  }
}
