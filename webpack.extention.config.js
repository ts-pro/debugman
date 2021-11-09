const path = require('path');

module.exports = {
  mode: 'production',

  entry: {
    'content-script': path.join(__dirname, 'src/extension/content-script.ts'),
    devtools: path.join(__dirname, 'src/extension/devtools.ts'),
    sw: path.join(__dirname, 'src/extension/sw.ts'),
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },

  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.extension.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
