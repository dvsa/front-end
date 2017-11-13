import path from 'path';

module.exports = {
  watch: true,
  entry: {
    mot: './src/assets/js/es6/index.js',
    development: './src/assets/js/development/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public', 'javascripts'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}]],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      
    })
  ]
};
