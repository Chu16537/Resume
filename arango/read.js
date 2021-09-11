const Arango = require('./Arango');

module.exports.getData = async (key) => {
    const db = Arango.get();
    const aql = db.aql;
    const queryString = aql`
        FOR p IN @@collection
        FILTER p._key == @key
        RETURN p
    `;
    queryString.bindVars['@collection'] = 'Players';
    queryString.bindVars.key = key;
    return db.query(queryString)
        .then((cur) => cur.next())
        .then((res) => {
            return res;
        }).catch((err) => {
            console.log(err)
        });
};