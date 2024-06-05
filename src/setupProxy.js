const { createProxyMiddleware } = require('http-proxy-middleware');


// https://www.lvyouwang.xyz/
module.exports = function (app) {
    app.use(createProxyMiddleware('/api/v1', {
        target: 'http://localhost:9000', // 确保使用 HTTPS 协议
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api/v1': ''
        },
    }));
};
