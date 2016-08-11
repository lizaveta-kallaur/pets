var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var User = require('./backend/models/User');

var nev = require('email-verification')(mongoose);
mongoose.connect('mongodb://localhost/pets');
var router = express. Router ( ) ; 

var nodemailer = require('nodemailer');


app.use(cookieParser("ssshhhhh"));

var redis = require ( "redis" ) ; 
var redisStore = require ( 'connect-redis' ) (session ) ; 
var path = require ( "path" ) ;  
var client = redis.createClient(); 

app.use (session ({ 
    secret : 'ssshhhhh' , 
    store : new redisStore ( { host : 'localhost' , port : 6379 , client : client ,ttl :   260 } ) , 
    saveUninitialized : false , 
    resave : false

}));

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('oh no')) // handle error
  }
  next() // otherwise continue
});

 
app.use (bodyParser. urlencoded ( {extended : false } ) ) ; 
app.use (bodyParser. json ( ) ) ; 

var port = process.env.PORT || 2000;   


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/////////////// NEV configuration ////////////

nev.configure({
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes

  verificationURL: 'http://localhost:2000/email-verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: { 
        user: 'lizka.kallaur@gmail.com',
        pass: 'love76aholif'
    }
  },

 
  passwordFieldName: 'pw',
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});


var transporter = nodemailer.createTransport('smtps://lizka.kallaur%40gmail.com:love76aholif@smtp.gmail.com');



////////// Router ///////////////////


router.put('/password', function(req,res) {
    User.findOne({email: req.body.email}, function(err, user) {
            
            if (err)
                res.send(err);
            var pw = Math.round(Math.random()*100000000);
            user.password = user.generateHash(pw);
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'pass changed!' });
            })

            var html = "<b>New password  "+ pw+"</b>";

            var mailOptions = {
                from: '"Fred Foo " <lizka.kallaur@gmail.com>', // sender address 
                to: user.email, // list of receivers 
                subject: 'Hello ✔', // Subject line 
                text: 'password', // plaintext body 
                html: html // html body 
            };
             
            // send mail with defined transport object 
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
    });
}); 


router.post('/login', function(req, res) {
    User.findOne({ 'email' :  req.body.email }, function(err, user) {
        // if there are any errors, return the error before anything else
     
        if (err)
            return res.status(404).send('ERROR');

        // if no user is found, return the message
        if (!user)
            return res.json({
                msg: 'Register or activate the page.'
            })

        // if the user is found but the password is wrong
        if (!user.validPassword(req.body.password))
            return res.json({
                msg: 'Oops! Wrong password.'
            })

        // all is well, return successful user
        
        session.key = user.email;

        return res.json({
                msg: 'Successful.',
        });
    });
});

router.post('/signup', function(req, res) {
    var email = req.body.email;
   
    var pw = req.body.password;
    var newUser = new User({
        email: email,
        full_name: req.body.fullname,
        age: req.body.age,           
    });
    
    newUser.password =  newUser.generateHash(pw);

    nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {

        if (err) {
            return res.status(404).send('ERROR: creating temp user FAILED');
        }

        // user already exists in persistent collection
        if (existingPersistentUser) {
            return res.json({
                msg: 'You have already signed up and confirmed your account. Did you forget your password?'
            });
        }

        // new user created
        if (newTempUser) {
            var URL = newTempUser[nev.options.URLFieldName];

            nev.sendVerificationEmail(email, URL, function(err, info) {
                
            if (err) {
                return res.status(404).send('ERROR: sending verification email FAILED');
            }
            return res.json({
                msg: 'An email has been sent to you. Please check it to verify your account.'
            });
        });

        // user already exists in temporary collection!
        } else {
            return res.json({
                msg: 'You have already signed up. Please check your email to verify your account.'
            });
        }
    });

});

router.get('/email-verification/:URL', function(req, res) {
    var url = req.params.URL;

    nev.confirmTempUser(url, function(err, user) {
        if  (err)
            return res.status(404).send('ERROR: sending confirmation email FAILED');
        if (user) {
            nev.sendConfirmationEmail(user.email, function(err, info) {

                if (err) {
                    return res.status(404).send('ERROR: sending confirmation email FAILED');
                }
                return res.json({
                    msg: 'CONFIRMED!',
                    info: info
                });
            });
        } else {
            return res.status(404).send('ERROR: confirming temp user FAILED');
        }
    });
});

router.get('/pets', function(req, res) {
    
    if (session.key) {

        User.findOne({email: session.key}, function(err, user) {
              
            if (err)
                res.send(err);
            
            res.json(user.pets);
        });
    } else {
        res.redirect( "/" );
    }
});

router.put('/addpet', function(req, res) {
    if (session.key) {
        User.findOneAndUpdate({email: session.key}, { $push: { pets: { name: req.body.name, kind:req.body.kind, age:+req.body.age } } }, {upsert: true}, function(err, user) {
           
            if (err)
                res.send(err);
            
            res.json(user.pets);
        });
    }
});

router.put('/editpet', function(req, res) {
    console.log(req.body);
    if (session.key) {
        User.findOneAndUpdate({email: session.key}, { $pull: {pets: { name: req.body.oldPet.name, kind:req.body.oldPet.kind, age:+req.body.oldPet.age }} }, {upsert: true}, function(err, user) {
            console.log(user);
            console.log(err);
            if (err)
                res.send(err);
            
           
        });
        User.findOneAndUpdate({email: session.key}, { $push: { pets: { name: req.body.pet.name, kind:req.body.pet.kind, age:+req.body.pet.age } } }, {upsert: true}, function(err, user) {
            console.log(err);
            if (err)
                res.send(err);
            
            console.log(user);
            res.json(user);
        });
    }
});

router.put('/deletepets', function(req, res) {
    console.log(req.body);
    if (session.key) {
        req.body.forEach(pet => {
            User.findOneAndUpdate({email: session.key}, { $pull: {pets: { name: pet.name, kind:pet.kind, age:+pet.age }} }, {upsert: true}, function(err, user) {
                
                if (err)
                    res.send(err);
            });
        })
        res.json({
             msg: "Success"
       })
    }
});


// router.get('/logout', function(req, res) {
//     session.destroy(function(err) { 
//         if (err) { 
//             console.log(err) ; 
//         } else { 
//             res.redirect('/') ; 
//         } 
//     } ) ; 
// });

app.use('/',router); 

app.listen(port);
console.log('Example app listening on port ' + port);