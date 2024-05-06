const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    // http://47.113.104.184:3000
    app.use(createProxyMiddleware('/api/v1', {
        target: 'http://localhost:9000', changeOrigin: true, ws: true, pathRewrite: {
            '^/api/v1': ''
        },
    }));
};