const Arango = require('./Arango');
const read = require('./read');

async function main() {

    await Arango.initialize();

    const data = await read.getData('123')

    console.log(data);

    await Arango.shutdown();
}



main()