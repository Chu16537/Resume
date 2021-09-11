const nats = require("./natsServer");
const clientID = "12345"; //要該n個時,請每開一個就修改成其他數字不重複

const topicName = "test";
const opCode = 1;
const eventCode = 2;

const data = {
    name: "xin",
};

const main = async () => {
    await nats.Init(clientID);

    await nats.subscribe(topicName);

    await nats.publish(topicName, opCode, eventCode, data);
};

main();
