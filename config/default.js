module.exports = {
  port: 9000,
  locales: [],
  client: {
    socket_server: 'data.socket.server.host',
    socket_port: 'data.socket.server.port',
    socket_timeout: 'data.socket.server.timeout'
  },
 paths: {
    views: {
      web: 'content/web/views',
      mobile: 'content/mobile/views',
      shared: 'content/shared/views',
      custom: {
          web: 'content/web/views/custom',
          mobile: 'content/mobile/views/custom',
          shared: 'content/shared/views/custom'
      }
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
    ],
	socket: {
	  server: {
	    host: 'http://localhost',
		port: 9002,
		timeout: 10000
	  }
	}
  },
  logging: {
	level: 'debug'
  },
    db: {
        users: {
            host: 'localhost',
            port: 27017,
            name: 'project-evolution'
        }
    }
};
