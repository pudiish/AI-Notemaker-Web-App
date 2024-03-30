// webpack.config.js

module.exports = {
    // other webpack configuration...
    resolve: {
      fallback: {
        "querystring": require.resolve("querystring-es3"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify")
      }
    }
  };
  