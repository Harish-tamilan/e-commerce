const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

let _db;

const mongoClient = (callback)=>{
    MongoClient.connect('mongodb://localhost:27017/ecommerce')
    .then((client)=>{
        _db = client.db();
        callback();
    })
    .catch(err=>console.log(err));
}

const getDb = ()=>{
    if(_db)
        return _db;
    throw 'No database found';
};

exports.mongoClient = mongoClient;
exports.getDb = getDb;