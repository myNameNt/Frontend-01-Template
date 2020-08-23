var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // 打包输出HTML
      title: '',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: 'index.html'
    })
  ],
  mode: 'development', // 调试的时候很好用
  optimization: {
    minimize: false// 调试的时候很好用
  },
  devServer: {
    open: true,
    compress: false,
    contentBase: "./src"
  }
}