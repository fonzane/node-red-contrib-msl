module.exports = function(RED) {
    function MSLConfigNode(config) {
        RED.nodes.createNode(this,config);
        this.hostname = config.hostname;
        this.devices = config.port;
        this.device = config.device;
        this.subdevice = config.subdevice;
        this.channel = config.channel;
    }
    RED.nodes.registerType("msl-input-channel-config",MSLConfigNode);
}