module.exports = {
    selector: function(fubar) {
        return
        {
            a: data.id,
            b: data.num
        };
    },
    transformer: function(payload) {
        return payload.body;
    }
};

