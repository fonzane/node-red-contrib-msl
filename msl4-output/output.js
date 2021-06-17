const axios = require('axios').default;

module.exports = function(RED) {
    function SetOutChannel(config) {
        RED.nodes.createNode(this, config);
        this.hostname = config.hostname;
        this.channels = config.channels;
        this.channel = config.channel;
        var node = this;
        node.on('input', () => {
            console.log(config);
            node.channel = config.channel;
            console.log(node.channel);
        })
    }
    RED.nodes.registerType('msl4-output', SetOutChannel);
}