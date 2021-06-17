const axios = require('axios').default;

module.exports = function(RED) {
    function SetInChannel(config) {
        RED.nodes.createNode(this, config);
        this.hostname = config.hostname;
        this.channels = config.channels;
        var node = this;
        node.on('input', async (msg) => {
            
        })
    }
    RED.nodes.registerType('msl4-input', SetInChannel);
}