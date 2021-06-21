module.exports = function(RED) {
    function MSLConfigNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        this.subdevice = config.subdevice;
        this.channel = config.channel;
    }
    RED.nodes.registerType("msl-channel-config",MSLConfigNode);
}