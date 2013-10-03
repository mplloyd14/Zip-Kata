module.exports = {
    port: 3100,
    locales: ['en'],
    client: {
        socket_server: 'data.socket.server.host',
        socket_port: 'data.socket.server.port',
        socket_timeout: 'data.socket.server.timeout'
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
            'socketProvider',
            'restProvider'
        ],
        socket: {
            server: {
                host: 'http://localhost',
                port: 3102,
                timeout: 10000
            }
        },
        REST: {
            server: {
                port: 3101
            }
        }
    },
    logging: {
        level: 'info'
    },
    db: {
        // session configuration - use shared mongodb session for all apps
        // pool config is not necessary here, because we are not using generic-pool
        session: {
          host: 'localhost',
          port: 27017,
          name: 'session',
          options: {
            server: {
              poolSize: 10,
              auto_reconnect: true,
              native_parser: true
            },
            db: {
              journal: true
            }
          }
        }
    }
};

