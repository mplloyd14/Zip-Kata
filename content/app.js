var pec = require('projevo-core'),
    config = require('config'),
    path = require('path'),
    config = require('config'),
    log = require('../lib/log')()




var root = path.join(__dirname, '..');
var providerPath = path.join(root, config.paths.providers);
var providers = new pec.ServicesProvider.ServicesProvider(config.data.providers,providerPath);

var webServer = new pec.ExpressServer();
var webProvider = providers.Express;
config.log = log;
webServer.configure(webProvider, config, root + '/');
webServer.start();

var restServer = pec.RestServer;
var restProvider = providers.REST;
restServer.configure(restProvider, {
    rest_port: config.data.REST.server.port,
    log: log
});
restServer.start();

var restClient = pec.RestClient;
restClient.configure(restProvider,{
    log: log
});

var eventBus = pec.EventBus;
var eventProvider = providers.events;
eventBus.configure(eventProvider,{
    log: log
});

var socketServer = pec.SocketServer;
var socketProvider = providers.Socket;
socketServer.configure(socketProvider, {
    socket_port: config.data.socket.server.port,
    log: log
});
socketServer.start();



