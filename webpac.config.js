module.exports = {
    resolve: {
      fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "crypto": require.resolve("crypto-browserify"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "http": require.resolve("stream-http"),
        "fs": false, // Disable fs as it is not available in the browser
        "net": false, // Disable net as it is not available in the browser
      },
    },
  };
  