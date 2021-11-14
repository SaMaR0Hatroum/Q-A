const express = require('express');
const router = require('./routers/userRouters');

const cookieparser = require('cookie-parser');

require('./config/mongoos');


const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(router)
app.use(express.static('public'));

app.get('/',function(req,res){
res.render('Homepage',{pageTitle:'Home'})
})


app.listen(3000, ()=> console.log('app is listening to port 3000...'))