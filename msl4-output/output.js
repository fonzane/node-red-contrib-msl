const axios = require('axios').default;

module.exports = function(RED) {
    function SetOutChannel(config) {
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
    RED.nodes.registerType('msl4-out', SetOutChannel);
}

/*
config:
{  
    id: '2aa864c0.3a2104',
    type: 'msl-output-channel-config',
    z: undefined,
    _closeCallbacks: [],
    _inputCallback: null,
    _inputCallbacks: null,
    wires: [],
    _wireCount: 0,
    send: [Function: NOOP_SEND],
    hostname: '192.168.20.118',
    devices: undefined,
    device: {
        hostname: '192.168.20.118',
        devices: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
    },
    subdevice: {
        channels: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object]
        ],
        devicename: 'MSL4QFW',
        deviceid: 2,
        uniqueid: 'MSL4_192.168.20.118_2021061204100010416',
        devicetype: 4
    },
    channel: {
        channelnr: 401,
        channeltype: 3,
        channelname: 'Digital Out 1',
        channelid: 33
    }
}
*/