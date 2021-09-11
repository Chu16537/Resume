const Schema = require('./Schema');

const firstNum = 10;
const secondNum = 10;
const data = { data: '你好' }

async function main() {

    let req = Schema.Write(Schema.SCHEMA_NAME.TEST, firstNum, secondNum, data);
    console.log('寫入資料:', req);

    let res = Schema.Read(Schema.SCHEMA_NAME.TEST, req);

    console.log('讀取資料', res);
}


main()