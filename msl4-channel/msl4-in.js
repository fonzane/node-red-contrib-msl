const axios = require('axios').default;

module.exports = function(RED) {
    function SetInChannel(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.channels = RED.nodes.getNode(config.mslChannel).channels;
        var node = this;
        node.on('input', async (msg) => {
            let channels = RED.nodes.getNode(config.mslChannel).channels;
            let channelids = channels.flatMap(channel => channel.uniqueid);
            console.log(channelids);
            let hostname = RED.nodes.getNode(RED.nodes.getNode(config.mslChannel).device).hostname
            try {
                const sourceobjects = await (await axios.get(`http://${hostname}/sourceobjects/`)).data.items.filter(sourceobject => channelids.some(cid => cid === sourceobject.uniqueid));
                console.log(sourceobjects);
                msg.payload = sourceobjects.length > 1 ? sourceobjects : sourceobjects[0];
                node.send(msg);
            } catch (err) {
                console.error(err);
                msg.payload = err;
                node.send(msg);
            }
        })
    }
    RED.nodes.registerType('msl4-in', SetInChannel);
}