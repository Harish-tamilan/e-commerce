const path = require('path');
const fs = require('fs'); 
const Cart = require('../models/cart');
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');
const mongodb = require('mongodb');
//const { getDb } = require('../util/database');
const ObjectId = mongodb.ObjectId;
const getDb = require('../util/database').getDb;


module.exports = class Product
{
    constructor(id,title, url, price, description, userId)
    {
        this._id = id ? new ObjectId(id) : null;
        this.title = title;
        this.url = url;
        this.price = price;
        this.description = description;
        this.userId = userId;
    }

    save()
    {
        const db = getDb();
        let dbOp;
        if(this._id)
        {
            console.log('inside if block in save method in product.js');
           dbOp = db.collection('product').updateOne({_id:this._id},{$set: this });
        }
        else
        {
            dbOp = db.collection('product').insertOne(this);
        }
        return dbOp.then((res)=>console.log(res)).catch((err)=>console.log(err));
    }

    // save()
    // {
    //     getProductsFromFile(function(fileContent){
    //         fileContent.push(this);
    //         fs.writeFile(p, JSON.stringify(fileContent),err=>{
    //             console.log(err);
    //         })
    //     }
    //     );
    // }

    static findById(id,cb)
    {
        console.log('inside findById, id is ', id);
        const db = getDb();
        db.collection('product').findOne({_id: new ObjectId(id)})
        .then((product)=>cb(product))
        .catch((err)=>{
            console.log('error in findById in product.js model ');
            cb({});
        })
    }

    static getAll(cb)
    {
        const db = getDb();

        db.collection('product').find({}).toArray()
        .then((res)=>{
            console.log('inside getAll in product.js');
            console.log(res);
            cb(res);
        })
        .catch((err)=>{
            console.log('error in reading the files from product collection');
        });
    }

    static delete(id,cb)
    {
        const db = getDb();
        db.collection('product').deleteOne({_id : new ObjectId(id)})
        .then((res)=>{
            console.log('product deleted successfully');
            this.getAll(cb);
        })
        .catch((err)=>console.log('error in deleting the product'));
    }
}