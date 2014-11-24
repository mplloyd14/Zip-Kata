module.exports = {
    selector: function(fubar) {
        return {
            fu: fubar.fu,
            bar: fubar.bar
        };
    },
    transformer: function(payload) {
        return payload.body;
    }
};

