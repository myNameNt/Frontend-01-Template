module.exports = {
  entry: './main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {pragma: 'createElement'}]]
          }
        }
      },
      {
        test: /\.view/,
        use: {
          loader: require.resolve('./myloader.js')
        }
      }
    ]
  },
  mode: 'development', // 调试的时候很好用
  optimization: {
    minimize: false// 调试的时候很好用
  }
}