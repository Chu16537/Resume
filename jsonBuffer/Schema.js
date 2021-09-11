const BufferPlus = require('buffer-plus');

const SCHEMA = {
    TEST: 'test',
}

BufferPlus.createSchema(SCHEMA.TEST, {
    type: 'object',
    order: ['data'],
    properties: {
        data: {
            type: 'string',
            description: '資料',
        },
    },
});

module.exports.SCHEMA_NAME = SCHEMA;

module.exports.Write = (schema, firstNum, secondNum, data) => {
    const d = BufferPlus.create().writeSchema(schema, data).toBuffer();

    const bp = BufferPlus.create(512);
    bp.writeInt16LE(firstNum);
    bp.moveTo(10, true);
    bp.writeUInt8(secondNum);
    bp.writeBuffer(d);

    return bp;
}

module.exports.Read = (schema, data) => {
    const buffer = BufferPlus.from(data);

    const firstNum = buffer.readInt16LE();
    buffer.moveTo(10);
    const secondNum = buffer.readInt8();

    const d = buffer.readSchema(schema);

    return {
        firstNum: firstNum,
        secondNum: secondNum,
        data: '讀取資料：' + JSON.stringify(d)
    }


}