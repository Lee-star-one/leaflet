module.exports = {
    publicPath: "./",
    'devServer': {
      "port": 8888,
      "open": true,
      'overlay': {
        warnings: false,
        errors: false
      },
      proxy: {
        "/api": {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    'lintOnSave': false,
    
  }