var User = require('./models/User');
var Pet = require('./models/Pet')
var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
mongoose.connect('mongodb://localhost/pets');
var bcrypt   = require('bcrypt-nodejs');

var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return insertTempUser(hash, tempUserData, callback);
};


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

module.exports = function(app, passport) {

    app.post('/login', function(req, res) {
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
            return res.json(user);
        });
    });

    app.post('/signup', function(req, res) {
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
                res.json({
                    msg: 'An email has been sent to you. Please check it to verify your account.',
                    info: info
                });
            });

            // user already exists in temporary collection!
            } else {
                res.json({
                msg: 'You have already signed up. Please check your email to verify your account.'
                });
            }
        });

    });

    app.get('/email-verification/:URL', function(req, res) {
        var url = req.params.URL;

        nev.confirmTempUser(url, function(err, user) {
            if (user) {
                nev.sendConfirmationEmail(user.email, function(err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending confirmation email FAILED');
                    }
                    res.json({
                        msg: 'CONFIRMED!',
                        info: info
                    });
                });
            } else {
                return res.status(404).send('ERROR: confirming temp user FAILED');
            }
        });
    });

    app.get('/:email', /*isLoggedIn,*/ function(req, res) {
        
        User.find({email: req.params.email}, function(err, user) {
            
            if (err)
                res.send(err);
            console.log(user);
            res.json(user);
        });
    });

    app.post('./:email/addpet', function(req, res) {
        
        User.find({email: req.params.email}, function(err, user) {
            
            if (err)
                res.send(err);
            var pet = new Pet();
            pet.name = req.body.name;
            pet.kind = req.body.kind;
            pet.age = req.body.age;
            user.pets.push(pet);
            res.json(user);
        });
    });


    // app.get('/logout', function(req, res) {
    //     req.logout();
    //     res.redirect('/');
    // });
};


