const path = require('path');
const fs = require('fs'); 

const p = path.join(path.dirname(process.mainModule.filename),'data','products.json');

const getProductsFromFile = (cb)=>{
    fs.readFile(p, (err, fileContent)=>{
        if(err)
        {
            cb([]);
        }
        else
        {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product
{
    constructor(t)
    {
        this.title = t;
    }

    save()
    {
        getProductsFromFile((fileContent)=>{
            fileContent.push(this);
            fs.writeFile(p, JSON.stringify(fileContent), err=>{
                console.log(err);
            });
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

    static getAll(cb)
    {
        getProductsFromFile(cb);
    }
}