// Frontend(4000)와 Backend의 Port(8000)가 다를경우 Frontend에서 보내는 port 요청을 변경.
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target:'http://localhost:8000',
            changeOrigin:true,
        })
    )
};