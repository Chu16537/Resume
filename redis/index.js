const redis = require('./redis');
const read = require('./read');

async function main() {

    await redis.Init();

    const data = await read.getData('key')

    console.log(data)


}


main()