const MODE = 'development';
const path = require('path');

module.exports = {
	mode: MODE,
	entry: {
		page: "./src/page.ts",
		popup: "./src/popup.ts"
	},
	output: {
		filename: '[name].bundle.js',
		path: `${__dirname}/extension`
	},
	devtool: MODE === 'development' ? 'inline-source-map' : '',
	module: {
		rules: [
			{
				// 'ts-loader' で TypeScript をコンパイル
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			},
			{
				test: /\.scss/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
							importLoaders: 2
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')({grid: true})
							]
						}
					},
					{
						loader: 'sass-loader'
					}
				],
			},
			{
				test: /\.css$/,
				// 配列最後尾のローダーから実行される
				use: ['css-loader'],
			}
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.scss', '.css'],
	}
};
