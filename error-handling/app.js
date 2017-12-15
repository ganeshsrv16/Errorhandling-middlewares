const express = require('express')
const app = express()
const path = require('path')
// require middlewares
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = 8080

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
    res.render('contact')
})

app.post('/contact', function(req,res,next) {
let name= req.body.usr;
let password= req.body.pass;
let repass= req.body.repass;
let age= req.body.no;
var err=new Error();

 if(name==""&&password=="")
{
 err.status=400;
next(err);
}
else if(name==""||password=="")
{
err.status=404;
next(err);
}
else if(age=="")
{
err.status=407;
next(err);
}
else if(age<18){
err.status=600;
next(err);
}
else if(password!==repass){
    err.status=601;
    next(err);
    }

res.render('contact-success', {name,password,age})
})

//error handler middleware1
app.use(function(err,req, res, next) {
    if(err.status==400) {
        res.render('error1');
    }
  next(err);
});

//error handler middleware2
app.use(function(err,req, res, next) {
    if(err.status==404){
        res.render('error2');
    }
    next(err);
});


//error handler middleware3
app.use(function(err,req, res, next) {
    if(err.status==600){
        res.render('error3');
    }
    next(err);
});

app.use(function(err,req, res, next) {
    if(err.status==407){
        res.render('error4');
    }
    next(err);
});
app.use(function(err,req, res, next) {
    if(err.status==601){
        res.render('error5');
    }
  
});



app.listen(port, function() {
    console.log(`listening on port ${port}...`)
})
