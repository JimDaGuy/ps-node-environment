import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'source-map',
  entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
		//Generate external CSS files with hash in filename
		new ExtractTextPlugin('[name].[contenthash].css'),
		//Hash files using MD5 so their names change when the content changes
		new WebpackMd5Hash(),
		//Plugin to create separate bundles and
		//cache vendor code separately
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		//Create HTML file with reference to bundled js
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingPath: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			trackJSToken: '8e598a5bdff84620b892e6f53f5d83e2',
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		//Minify JS
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		})
	],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})}
    ]
  },
	devServer: {
      noInfo: false
  }
}
