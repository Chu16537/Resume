const protoLoader = require('@grpc/proto-loader');
const grpc = require('@grpc/grpc-js');

// proto 文件必須跟 server相同
const packageDefinition = protoLoader.loadSync('./example.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// packageName 是 proto 的 package
const protoc = grpc.loadPackageDefinition(packageDefinition).protoc;

module.exports.Init = () => {
    ip = '127.0.0.1:9898';

    // GameServer 是 proto的 service 
    this.client = new protoc.MatchService(ip, grpc.credentials.createInsecure());
    return this.ack();
};

module.exports.ack = async () => {
    return new Promise((resolve, reject) => {
        if (!this.client) {
            reject(new Error('gRPCClient not init yet'));
            return;
        }
        this.client.Ack({}, (err, response) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(response);
            return;
        });
    });
};