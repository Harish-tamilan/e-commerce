const path = require('path');
const fs = require('fs'); 
const Cart = require('../models/cart');
const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductsFromFile = (cb)=>{
    fs.readFile(p, (err, fileContent)=>{
        if(err)
        {
            cb([]);
        }
        else
        {
            //console.log('Filecontent is ',fileContent);
            if(fileContent.length>0)
                cb(JSON.parse(fileContent));
            else
                cb([]);
        }
    });
};

module.exports = class Product
{
    constructor(id,title, url, price, description)
    {
        this.id = id;
        this.title = title;
        this.url = url;
        this.price = price;
        this.description = description;
    }

    save()
    {
        getProductsFromFile((fileContent)=>{
            if(this.id)
            {
                console.log('Inside if block in save method in product model');
                const index = fileContent.findIndex((prod)=>prod.id===this.id);
                fileContent[index] = this;
                fs.writeFile(p, JSON.stringify(fileContent), err=>{
                    console.log(err);
                });
            }
            else
            {
                this.id = Math.random().toString();
                fileContent.push(this);
                fs.writeFile(p, JSON.stringify(fileContent), err=>{
                    console.log(err);
                });
            }
        });
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
        getProductsFromFile((products)=>
        {
            const product = products.find((prod)=>prod.id==id);
            console.log('inside findById in Product model, product is ');
            console.log(product);
            cb(product);
        });
    }

    static getAll(cb)
    {
        getProductsFromFile(cb);
    }

    static delete(id,cb)
    {
        this.findById(id,(prod)=>{
            Cart.deleteProduct(id, prod.price);
        });

        getProductsFromFile((products)=>{
            const prods = products.filter((prod)=>prod.id!==id);
            cb(prods);
            fs.writeFile(p, JSON.stringify(prods), (error)=>{
                if(!error)
                {
                    
                }
            });
        });
    }
}