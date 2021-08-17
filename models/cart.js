const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename),'data','cart.json');

const getProductsFromFile = (cb)=>{
    fs.readFile(p, (err, fileContent)=>{
        if(!err)
        {
            if(fileContent)
                cb(JSON.parse(fileContent));
            else
                cb({});
        }
        else
        {
            console.log(err);
            cb({});
        }
    });
}

module.exports = class cart
{
    constructor(id,price)
    {
        this.id = id;
        this.price = price;
    }

    add(cb)
    {
        console.log('inside add in cart.js controller, this is ', this);
        getProductsFromFile((fileContent)=>{
            const id = this.id;
            const price = this.price;
            console.log('id is ',id,' price is ',price);
            const products = fileContent.products;
            console.log(products);
            let found;
            if(products)
            {
                found = products.find((item)=> id==item.id);
            }
            
            console.log('found is ',found);
            let temp = {};
            let tot = 0;
            
            if(found)
            {
                let quantity = found.quantity+1;
                temp = {id:id, quantity:quantity};
                console.log('quantity is ',quantity);
                console.log('temp is ',temp);
                tot = fileContent.totalPrice + price;
            }
            else
            {
                temp = {id:id, quantity:1};
                tot = fileContent.totalPrice + price;
            }
            let arr;
            if(products.length>0)
            {
                arr = [...products];
                console.log('arr is ',arr);
                let index = -1;
                if(found)
                {
                   index = products.findIndex((prod)=>prod.id===id);
                   arr[index] = temp;
                }
                else
                {
                    arr.push(temp);
                }
            }
            else
            {
                arr = [];
                arr.push(temp);
            }
            
            const file = {products:arr, totalPrice:tot};
            console.log(file);
            cb(file);
            fs.writeFile(p, JSON.stringify(file), err=>{
                console.log(err);
            });
            
        });
    }

    static getProducts(cb)
    {
        getProductsFromFile(cb);
    }

    static deleteProduct(id, price)
    {
        getProductsFromFile((fileContent)=>{
            let quantity = fileContent.products.find((item)=>item.id==id).quantity;
            const products = fileContent.products.filter((item)=>item.id!==id);
            //products.filter((item)=>item.id!==id);
            console.log('Inside deleteProduct in cart.js, cart items after filetering are ', products);
            console.log('The quantity is ',quantity);
            let totalPrice = fileContent.totalPrice;
            totalPrice = totalPrice - price*quantity;
            const obj = {
                products:products,
                totalPrice:totalPrice
            };
            console.log(obj);
            fs.writeFile(p, JSON.stringify(obj), err=>{
                console.log(err);
            });
        })
    }
}