const hostname = '127.0.0.1';
const port = 3000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // res.send('Hello World, It is me');
    res.render('index');

});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/contact/send', (req, res) => {
    // console.log('working');
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'youremail@gmail.com',
            pass: 'password'
        }
    });

    var mailOptions = {
        from: 'Whoever <youremail@gmail.com>',
        to: 'otheremail@email.com',
        subject: 'Website Submission',
        text: `You have a submission with following details... Name: ${req.body.name}, Email: ${req.body.email}, Message: ${req.body.message}`,
        html: `<p>You have a submission with following details... <ul><li>Name: ${req.body.name}</li> <li>Email: ${req.body.email}</li> <li>Message: ${req.body.message}</li> </ul></p>`
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/');
        }
        else {
            console.log(`Message Sent: ${info.response}`);
            res.redirect('/');
        }
    })
})

app.listen(3000)
console.log("Server running at port 3000....")
