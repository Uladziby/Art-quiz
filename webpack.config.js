const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const srcPath = path.resolve(__dirname, 'src');

module.exports = {
        entry: {
     
        body: './src/index.js'
      },
      output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: `assets/[name][ext]`,
      },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
     
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' }}, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{loader: MiniCssExtractPlugin.loader, options: { publicPath: '../' }}, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new CopyPlugin({
        patterns: [
          {
            from: '**/*',
            context: srcPath,
            globOptions: {
              ignore: [
                '**/*.js',
                '**/*.ts',
                '**/*.scss',
                '**/*.sass',
                '**/*.html',
              ],
            },
            noErrorOnMissing: true,
            force: true,
          },
        {from: path.resolve(__dirname,'src/assets/') ,to : path.resolve(__dirname, 'dist/assets') }
        ],
      }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
