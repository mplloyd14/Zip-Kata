module.exports = {
    port: 3000,
    locales: ['en'],
    client: {
        socket_server: 'data.socket.server.host',
        socket_port: 'data.socket.server.port',
        socket_timeout: 'data.socket.server.timeout',
        log : 'test'
    },
    paths: {
        views: {
            web: 'content/web/views',
            mobile: 'content/mobile/views',
            shared: 'content/shared/views'
        },
        static: {
            web: 'content/web/public',
            mobile: 'content/mobile/public',
            shared: 'content/shared/public'
        },
        locales: 'content/locales',
        providers: 'config/providers',
        routes: 'config/routes'
    },
    data: {
        providers: [
            'socketProvider.js',
            'restProvider.js'
        ],
        socket: {
            server: {
                host: 'http://localhost',
                port: 3002,
                timeout: 10000
            }
        },
        REST: {
            server: {
                port: 3001
            }
        }
    },
    logging: {
        level: 'info'
    }

};

