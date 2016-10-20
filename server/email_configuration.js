Meteor.startup(function () {
  // code to run on server at startup
  // TODO Poner índices a la BBDD

  // Mail configuration
  smtp = {
    username: 'noreply@watho.net',   // eg: server@gentlenode.com
    password: 'jarstorm84',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.zoho.com',  // eg: mail.gandi.net
    port: 465
  };
 
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' 
  + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.onCreateUser(function(options, user) {

  // Set user role
  user.type = options.profile.type;
  // Email entered by user
  var email =  user.emails[0].address;

  // User type
  if ("company" === user.type) {
    // Create company Object  
  	var new_company = {"_id":user._id, "created_on": new Date().getTime(), "email": email};
  	Company.insert(new_company);
  } else if ("user" === user.type) {
    // Create company Object  
    var new_user = {"_id":user._id, "created_on": new Date().getTime(), "email": email};
    User.insert(new_user);
	}

	return user;
});


Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
  	throw new Meteor.Error(403, 'Your email is not verified. We have sent an email in order to verify your account. Please check your inbox.');
  }
  return true;
});

Accounts.config({sendVerificationEmail: true});

Accounts.emailTemplates.from = 'Watho <noreply@watho.net>';

// The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
Accounts.emailTemplates.siteName = 'Watho - Work at home';

// A Function that takes a user object and returns a String for the subject line of the email.
Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Confirm Your Email Address';
};

// A Function that takes a user object and a url, and returns the body text for the email.
// Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
Accounts.emailTemplates.verifyEmail.html = function(user, url) {
  return '<div style="background: linear-gradient(to bottom, #4c4c4c 0%,#2c2c2c 54%); border-radius: 7px;'
  + 'width: 90%; height: 200px; padding: 20px;"> <img style="margin-left: auto; margin-right: auto;" src="https://file.ac/pCr57-JYxLQ/logo_brand.png"/><br><br><p style="color:#fff; font-size: 20px">Welcome to <a href="http://www.watho.net" style="color:#119c34;">watho.net</a></p>'
  + '<p style="color:#fff; font-size: 20px">In order to verify your email please click on the following <a href="'
  + url + '" style="color:#119c34;">link</a></div>';
};

// Reset password template
Accounts.emailTemplates.resetPassword.html = function(user, url) {
  return '<div style="background: linear-gradient(to bottom, #4c4c4c 0%,#2c2c2c 54%); border-radius: 7px;'
  + 'width: 90%; height: 200px; padding: 20px;"> <img style="margin-left: auto; margin-right: auto;" src="https://file.ac/pCr57-JYxLQ/logo_brand.png"/><br><br><p style="color:#fff; font-size: 20px">Welcome to <a href="http://www.watho.net" style="color:#119c34;">watho.net</a></p>'
  + '<p style="color:#fff; font-size: 20px">In order to reset your password please click on the following <a href="'
  + url + '" style="color:#119c34;">link</a></div>';
};