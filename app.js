const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Error = require('./controllers/error');
const app = express();
const mongodb = require('mongodb');
const mongoClient = require('./util/database').mongoClient;
const getDb = require('./util/database').getDb;
const User = require('./models/user');

const url = 'mongodb://localhost:27017/ecommerce';

app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    const user = User.findById('6134ae5973a2fb3026fe0e71')
    .then((user)=> {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch((err)=>console.log(err));
})

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use(Error.getError);

try
{
    mongoClient(()=>{
        app.listen(4000);
        const db = getDb();
        //console.log(db);
        db.collection('user').find({}).toArray()
        .then((result)=>{
            //console.log(result);
        })
        .catch(err=>console.log(err));
    })
}
catch(err)
{
    console.log(err);
}


