import path from 'path';
import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin, { loader as _loader } from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = path.resolve(path.dirname(''));
const srcPath = _resolve(__dirname, 'src');

export const entry = {
  body: './src/index.js'
};
export const output = {
  filename: '[name].[contenthash].js',
  path: _resolve(__dirname, 'dist'),
  assetModuleFilename: `assets/[name][ext]`,
};
export const module = {
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
      use: [{ loader: _loader, options: { publicPath: '../' } }, 'css-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [{ loader: _loader, options: { publicPath: '../' } }, 'css-loader', 'sass-loader']
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
};
export const plugins = [
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
      { from: _resolve(__dirname, 'src/assets/'), to: _resolve(__dirname, 'dist/assets') }
    ],
  }),
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new MiniCssExtractPlugin({ filename: "[name].css" }),
];
export const resolve = {
  extensions: ['.js'],
};
