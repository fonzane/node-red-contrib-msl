const axios = require('axios').default;

module.exports = function(RED) {
    function SetInChannel(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.channel = RED.nodes.getNode(config.mslChannel).channel;
        var node = this;
        node.on('input', async (msg) => {
            let hostname = RED.nodes.getNode(RED.nodes.getNode(config.mslChannel).device).hostname
            try {
                const sourceobject = await (await axios.get(`http://${hostname}/sourceobjects/`)).data.items.find(sourceobject => sourceobject[Object.keys(sourceobject)[0]].channelid === node.channel.channelid);
                msg.payload = sourceobject[Object.keys(sourceobject)[0]];
                node.send(msg);
            } catch (err) {
                console.error(err);
                msg.payload = err;
                node.send(msg);
            }
        })
    }
    RED.nodes.registerType('msl4-channel', SetInChannel);
}