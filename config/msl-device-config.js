module.exports = function(RED) {
    function SetMSLDevice(config) {
        RED.nodes.createNode(this,config);
        this.hostname = config.hostname;
        this.device = config.device;
    }
    RED.nodes.registerType("msl-device-config",SetMSLDevice);
}