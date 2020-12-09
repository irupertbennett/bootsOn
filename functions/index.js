const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'irupertbennett@gmail.com',
        pass: '6ufz9Qv2sM'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        const dest = req.query.dest;
        var type = req.body.type;
        var make = req.body.make;
        var model = req.body.model;
        var size = req.body.size;
        var weight = req.body.weight;
        var firstName = req.body.firstName;
        var lastname = req.body.lastName;
        const email = req.body.email;

        const mailOptions = {
            from: firstName + ' ' + lastname + ' <' + email + '>;',
            to: dest,
            subject: 'Boots On - New gear needs approving!',
            html: `
                Type:  ${type} <br /> 
                Make: ${make} <br />
                Model: ${model} <br />
                Size: ${size} <br />
                Weight: ${weight}
            `
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });    
});