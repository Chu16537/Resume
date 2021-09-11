const ioredis = require("ioredis");


const host = '127.0.0.1'
const port = [7001, 7002, 7003, 7004, 7005, 7006]
const opt = {
    password: '',
}

let redis;

module.exports.Init = async () => {

    const data = port.map((v) => {
        return {
            port: v,
            host: host,
        }
    })
    redis = new ioredis.Cluster(data, opt)

    redis.on('error', () => {
        console.log('redis is FAIL')
    })

    redis.on('connect', () => {
        console.log('redis is connect')
    })

    redis.on('ready', () => {
        console.log('redis is ready')
    })

}

module.exports.get = () => {
    return redis;
};