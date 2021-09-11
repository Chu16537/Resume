
const arangojs = require('arangojs');
const aql = arangojs.aql;

let arangoDbClient = null;
let client = null;


// arango 預設 8529
const url = 'http://127.0.0.1:8529';

// 預設值
const auth = { username: 'root', password: '' }

// 預設值
const DB_NAME = '_system';



async function waitDatabaseReady(db) {
    async function checkConnection(checkDb) {
        try {
            await checkDb.version();
            return true;
        } catch (err) {
            if (err.code < 500) {
                return true;
            }
            return false;
        }
    }

    if (!(await checkConnection(db))) {
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                checkConnection(db).then((result) => {
                    if (result) {
                        clearInterval(timer);
                        resolve(true);
                    }
                });
            }, 1000);
        });
    }
    return true;
}

module.exports.initialize = async () => {
    try {


        arangoDbClient = new arangojs.Database({
            url: url,
            precaptureStackTraces: true,
            databaseName: '_system',
            auth: auth,
            agentOptions: {
                maxSockets: 50,
                keepAlive: true,
                keepAliveMsecs: 10000,
            },
            loadBalancingStrategy: 'ROUND_ROBIN',
        });

        await waitDatabaseReady(arangoDbClient);

        client = arangoDbClient.database(DB_NAME);

        // inject AQL helper
        client.aql = aql;

    } catch (err) {
        throw err;
    }
};

module.exports.shutdown = async () => {
    return arangoDbClient.close();
};

module.exports.get = () => {
    return client;
};
