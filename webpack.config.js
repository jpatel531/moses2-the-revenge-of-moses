var path = require('path');

module.exports = {
  entry: './lib/Main.jsx',
  output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
  },
  externals: {
    electron: 'commonjs electron',
    fs: 'commonjs fs',
    nodegit: 'commonjs nodegit',
    child_process: 'commonjs child_process',
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    marked: "commonjs marked",
    "react-router": "commonjs react-router",
    remote: "commonjs remote",
    electron: "commonjs electron",
    events: "commonjs events",
    path: "commonjs path",
    Hammer: "Hammer"
  },
  module: {
    loaders: [
      { 
        test: path.join(__dirname, '/lib'),
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