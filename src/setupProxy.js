const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://25.7.34.144:7277',
      secure: false,
      changeOrigin: true,
      followRedirects: true,
    })
  );
};