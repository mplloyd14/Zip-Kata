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
    },
    log: {
        client: {
            levels: ['error', 'warn', 'info', 'debug'],
            transports: [
                {
                    type: 'console',
                    level: 'info',
                    enabled: true,
                    buffer: {
                        interval: 2000,
                        limit: 500
                    }
                },
                {
                    type: 'loggly',
                    level: 'error',
                    enabled: true,
                    key: '1a21ae55-17e2-47d7-9000-3d7c4e317e20'
                },
                {
                    type: 'loggly',
                    level: 'debug',
                    enabled: true,
                    key: '1a21ae55-17e2-47d7-9000-3d7c4e317e20'
                }
            ]
        }
    }
};

