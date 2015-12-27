var path = require('path');

module.exports = {
  entry: './components/Main.jsx',
  output: {
      path: path.join(__dirname, '/lib'),
      filename: 'bundle.js'
  },
  externals: {
    electron: 'commonjs electron',
    fs: 'commonjs fs',
    nodegit: 'commonjs nodegit',
    child_process: 'commonjs child_process'
  },
  module: {
    loaders: [
      { 
        test: path.join(__dirname, '/components'),
        loader: 'babel?presets[]=react,presets[]=es2015' 
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test   : /\.(ttf|eot|svg|woff(?:2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
    ]
  }
};