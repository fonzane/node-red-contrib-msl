const axios = require('axios').default;

module.exports = function(RED) {
    function SetInChannel(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.channel = RED.nodes.getNode(config.mslChannel).channel;
        var node = this;
        node.on('input', async (msg) => {
            let hostname = RED.nodes.getNode(config.mslChannel).hostname
            try {
                const sourceobject = await (await axios.get(`http://${hostname}/sourceobjects/`)).data.items.find(sourceobject => sourceobject[Object.keys(sourceobject)[0]].channelid === node.channel.channelid);
                console.log(node.channel);
                console.log(sourceobject);
                msg.payload = sourceobject[Object.keys(sourceobject)[0]];
                node.send(msg);
            } catch (err) {
                console.error(err);
            }
        })
    }
    RED.nodes.registerType('msl4-input', SetInChannel);
}