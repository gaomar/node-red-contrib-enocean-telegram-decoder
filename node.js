module.exports = function(RED) {
    function main(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            var date = new Date();
            var ESP3_Packet = msg.payload;
            var DataLength = 256*ESP3_Packet[1]+ESP3_Packet[2];
            var RawData = ESP3_Packet.slice(6,6+DataLength);
            var ERP2_Header = RawData.slice(0,1).toString("hex");
            var EEP = "RPS";
            var OriginatorID = "00000000";
            var Data1 = "00";
            var Data4 = "00000000";
            var OptionalData = ESP3_Packet.slice(6+DataLength,8+DataLength);
            var SubTelNum = OptionalData.slice(0,1);
            var dBm = OptionalData.slice(1,2);
            //
            switch(ERP2_Header){
                //normal telegram
                case "20"://RPS telegram
                    EEP = "RPS";
                    OriginatorID = RawData.slice(1,5).toString("hex");
                    Data1 = RawData.slice(5,6).toString("hex");
                    break;
                case "21"://1BS normal telegram
                    EEP = "1BS";
                    OriginatorID = RawData.slice(1,5).toString("hex");
                    Data1 = RawData.slice(5,6).toString("hex");
                    break;
                case "22"://4BS normal telegram
                    EEP = "4BS";
                    OriginatorID = RawData.slice(1,5).toString("hex");
                    Data4 = RawData.slice(5,9).toString("hex");
                    break;
                //teach-in telegram
                case "61"://1BS teach-in telegram
                    EEP = "1BS teach-in";
                    OriginatorID = RawData.slice(3,7).toString("hex");
                    Data1 = RawData.slice(7,8).toString("hex");       
                    break;
                case "62"://4BS teach-in telegram
                    EEP = "4BS teach-in";
                    OriginatorID = RawData.slice(3,7).toString("hex");
                    Data4 = RawData.slice(7,11).toString("hex");
                    break;
                default:
                    break;
            }

            msg.payload = {
                Time :  date.toString(),
                OriginatorID:OriginatorID,
                EEP : EEP,
                Data1:Data1,
                Data4:Data4,
                SubTelNum:SubTelNum,
                dBm:dBm
            };
            
            node.send(msg);
        });
    }
    RED.nodes.registerType("enocean-decoder", main);
 }
 