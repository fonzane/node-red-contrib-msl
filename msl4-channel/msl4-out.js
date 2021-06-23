const axios = require('axios').default;

module.exports = function(RED) {
    function SetOutChannel(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.channel = RED.nodes.getNode(config.mslChannel).channel;
        var node = this;
        node.on('input', async (msg) => {
            let hostname = RED.nodes.getNode(RED.nodes.getNode(config.mslChannel).device).hostname
            if(!isNaN(msg.payload)) {
                try {
                    const response = await axios.get(`http://${hostname}/LogWeb/servlet/SetChannelValue?channelid=${node.channel.channelid}&value=${msg.payload}`)
                    msg.payload = response.data;
                    node.send(msg);
                } catch (err) {
                    console.error(err);
                    msg.payload = err;
                    node.send(msg);
                }
            } else {
                msg.payload = {
                    message: 'Wert konnte nicht gesetzt werden',
                    reason: 'Eingangswert ist keine Zahl',
                    error: true
                }
            } 
        })
    }
    RED.nodes.registerType('msl4-out', SetOutChannel);
}