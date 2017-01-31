var http = require('http');
var request = require('request-promise');
var nodemailer = require('nodemailer');

var server = http.createServer(function(req, res) {
	var options = {
	  method: 'GET',
	  uri: 'http://fm-dev.spf.strands.com/api/categories/get/all.action',
		headers: {
        'HTTP_STRANDS_USER': 'testUserBU1'
    },
	};

	var sendMail = function() {
		var mailTransport = nodemailer.createTransport('smtps://username%40gmail.com:password@smtp.gmail.com');

		var mailOptions = {
		   from: "Sender Name <jmirallepaez@gmail.com>",
		   to: "Recipient Name <jmirallepaez@gmail.com>",
		   subject: "Hello World",
		   text: "Test email with node.js",
		   html: '<b>Test email with node.js</b>'
		};


		mailTransport.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	}

	request(options)
		.then(function (response) {
			console.log("OK");
			sendMail();
		})
		.catch(function (err) {
			console.log("Error:"+err);
		})

});
server.listen(3000);
