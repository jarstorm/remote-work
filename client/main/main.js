Meteor.startup(function () {
  Session.set("wathoMail", "contact@watho.net");
  Session.set("twitter", "https://twitter.com/watho_company");
  Session.set("filesPath", "/");
  
  //Test
  //Session.set("stripePublicKey", "pk_test_GDkOKngJHHpXua7ufxP0B22o");
  // Prduction
  Session.set("stripePublicKey", "pk_live_C19BoYehLfdR00nr6C6Bmmz4");
  
  // Customize login buttons on startup
  customizeLoginButtons();

});

// Customize login buttons on logout
Accounts.onLogout(function(){
    customizeLoginButtons();
});


function customizeLoginButtons() {
	// TODO Poner el nombre este bien
  $('#login-dropdown-list .dropdown-toggle').html("Company sign in / up<b class='caret'></b>");
}
