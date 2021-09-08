const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User{
    constructor(username, email, cart, id)
    {
        this.name = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    static findById(id)
    {
        const db = getDb();
        
        return db.collection('user').findOne({_id:new ObjectId(id)})
        .then((user)=>{
            return user;
        })
        .catch(err=>console.log(err));
    }

    addToCart(item,cb)
    {
        console.log('inside addToCart in user.js, the item is ');
        console.log(item);
        const items = [...this.cart.items];
        const index = items.findIndex((it)=>item._id.toString()===it._id.toString());
        if(index<0)
        {
            const obj = {...item, quantity:1};
            items.push(obj);
        }
        else
        {
            items[index].quantity = items[index].quantity + 1;
        }
        const db = getDb();
        db.collection('user').updateOne({_id:this._id},{$set:{cart:{items:items}}})
        .then((res)=>{
            this.getCart(this._id,cb);
        });
    }

    deleteCart(id)
    {
        let items = [...this.cart.items];
        const index = items.findIndex((it)=>it._id.toString()===id.toString());
        console.log('index is ');
        if(items[index].quantity===1)
        {
            //items.push(item);
            items = items.filter((item)=>item._id.toString()!==id.toString());
            console.log(items);
        }
        else
        {
            items[index].quantity = items[index].quantity -1;
        }
        const db = getDb();
        db.collection('user').updateOne({_id:this._id},{$set:{cart:{items:items}}});
    }

    getCart(id,cb)
    {
        const db = getDb();
        db.collection('user').findOne({_id:new ObjectId(id)})
        .then((user)=>{
            cb(user.cart);
        })
        .catch((err)=>{
            console.log('error in fetching the cart');
            cb([]);
        })
    }

    addOrder(cb)
    {
        const db = getDb();
        this.getCart(this._id, (cart)=>{
            return db.collection('order').insertOne({
                items:cart.items,
                user:{
                    _id: new ObjectId(this._id),
                    name:this.name
                }
            })
            .then((res)=>{
                console.log('ordered successfully');
                db.collection('user').updateOne(
                    { _id: new ObjectId(this._id) },
                    { $set: { cart: { items: [] } } }
                  );

                this.getOrder(cb);
            });
        })
    }

    getOrder(cb)
    {
        const db = getDb();

        db.collection('order').find({}).toArray()
        .then((res)=>{
            console.log('inside getOrder in user.js');
            console.log(res);
            cb(res);
        })
        .catch((err)=>{
            console.log('error in reading the files from product collection');
        });
    }
}

module.exports = User;

