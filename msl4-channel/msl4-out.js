const axios = require('axios').default;

module.exports = function(RED) {
    function SetOutChannel(config) {
        RED.nodes.createNode(this, config);
        this.name = config.name;
        this.channels = RED.nodes.getNode(config.mslChannel).channels;
        var node = this;
        node.on('input', async (msg) => {
            let hostname = RED.nodes.getNode(RED.nodes.getNode(config.mslChannel).device).hostname
            if(msg.payload.length !== node.channels.length) {
                msg.payload = {
                    payload: msg.payload,
                    error: true,
                    message: "Werte konnten nicht gesetzt werden.",
                    reason: "Anzahl von Eingangswerten stimmt nicht mit der Anzahl zugeordneter Kanäle überein"
                }
                node.send(msg);
            } else if (msg.payload.some(x => isNaN(x))) {
                msg.payload = {
                    payload: msg.payload,
                    error: true,
                    message: "Werte konnten nicht gesetzt werden",
                    reason: "Eingangs-Array enthält nicht-numerische Werte."
                } 
                node.send(msg);
            } else if (msg.payload.length === node.channels.length && msg.payload.every(x => !isNaN(x))) {
                    let response = [];
                    node.channels.forEach(async (channel, i) => {
                        try {
                            let tempResp = (await axios.get(`http://${hostname}/LogWeb/servlet/SetChannelValue?channelid=${channel.channelid}&value=${msg.payload[i]}`)).data
                            tempResp.success = tempResp.error;
                            delete tempResp.error;
                            response.push(tempResp);
                        } catch (err) {
                            response.push(err);
                        }
                        if(i === node.channels.length-1) {
                            msg.payload = response;
                            node.send(msg);
                        }
                    })
            } else {
                msg.payload = {
                    payload: msg.payload,
                    error: true,
                    message: "Konnte Werte nicht setzen",
                    reason: "Unbekannt"
                }
                node.send(msg);
            }
        })
    }
    RED.nodes.registerType('msl4-out', SetOutChannel);
}