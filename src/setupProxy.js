const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    app.use(
        '/index',
        createProxyMiddleware({
            target: 'http://192.168.1.5:8080/',
            changeOrigin: false
        })
    );
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'http://192.168.1.5:8080/',
            changeOrigin: false
        })
    );
    app.use(
        '/topic',
        createProxyMiddleware({
            target: 'http://192.168.1.5:8080/',
            changeOrigin: false
        })
    );
    app.use(
        '/terminal',
        createProxyMiddleware({
            target: 'http://192.168.1.5:8080/',
            changeOrigin: false
        })
    );
};
