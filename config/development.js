//to run e2e test, set up the user as userTest because this is a admin and vendor in same time.
module.exports = {
    port: 6020,
    authenticationServer : 'localhost:3000',
    backdoor: {
        user: 'ssuser',
        context: {
            product: 'etldemo',
            company: 'ss'
        }
    }
};