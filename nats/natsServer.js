const NATS = require('node-nats-streaming');

let sc;

module.exports.Init = async (clientID) => {
    return new Promise((resolve, reject) => {
        if (!sc) {
            sc = NATS.connect('clusterId', clientID, {
                url: 'nats://127.0.0.1:4224',
                servers: ['nats://127.0.0.1:4222', 'nats://127.0.0.1:4223', 'nats://127.0.0.1:4224'],
                user: 'jim',
                pass: 'password',
                stanPingInterval: 1000,
                stanMaxPingOut: 3,
            });
            sc.on('connect', () => {
                resolve(sc);
            });
        }
    });
};

module.exports.publish = (topicName, openCode, eventCode, data) => {
    const reqData = JSON.stringify(data);
    const len = Buffer.byteLength(reqData);
    const buf = Buffer.alloc(7 + len);
    buf.writeUInt8(openCode, 0);
    buf.writeUInt16LE(eventCode, 1);
    buf.writeUInt16LE(len, 4);
    buf.write(reqData, 7);

    return new Promise((resolve, reject) => {
        sc.publish(topicName, buf, (err, guid) => {
            if (err) {
                logger.error('publish err: %s', err);
                return reject(err);
            }
            return resolve(guid);
        });
    });
};

module.exports.subscribe = (topicName, subOptions = null) => {
    const subscription = sc.subscribe(topicName, subOptions);
    subscription.on('message', (data) => {
        const buffer = Buffer.from(data.getRawData());
        const payloadSize = buffer.readUInt32LE(3);
        const payload = JSON.parse(
            buffer
                .slice(7, 7 + payloadSize)
                .toString('utf8')
                .trim(),
        );
        console.log(`topicName: ${topicName} opCode :${buffer[0]}  ,eventCode:${buffer.readUInt16LE(1)} ,subscribe: ${JSON.stringify(payload)}`,)
    });
    return subscription;
};