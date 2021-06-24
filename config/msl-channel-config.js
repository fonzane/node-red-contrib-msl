module.exports = function(RED) {
    function MSLConfigNode(config) {
        RED.nodes.createNode(this,config);
        this.device = config.device;
        this.subdevice = config.subdevice;
        this.channels = config.channels;
    }
    RED.nodes.registerType("msl-channel-config",MSLConfigNode);
}