const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://localhost:8080/',
            changeOrigin: false
        })
    );
    app.use(
        '/topic',
        createProxyMiddleware({
            target: 'http://localhost:8080/',
            changeOrigin: false
        })
    );
};
