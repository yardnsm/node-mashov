import webpack from 'webpack';
import path from 'path';

import pkg from './package.json';

export default env => ({
  entry: './lib/index.js',

  mode: env === 'min' ? 'production' : 'none',

  output: {
    filename: env === 'min' ? `${pkg.name}.min.js` : `${pkg.name}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'nodeMashov',
    libraryTarget: 'umd',
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },

  devtool: 'source-maps',

  plugins: [
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | (c) by ${pkg.author.name || pkg.author}`,
    }),
  ],
});
