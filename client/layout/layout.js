Template.layout.rendered = function() {
    var interval = Meteor.setInterval(function() {
        var htmlContent = $('#login-dropdown-list .dropdown-toggle').html();
        if ('Sign in / up <b class="caret"></b>' === htmlContent) {
            updateLoginButtonText();
            Meteor.clearInterval(interval);
        }
    }, 100);
};


Accounts.onLogout(function(){
    Meteor.setTimeout(function() {
        updateLoginButtonText();
    }, 50);
    
});



function updateLoginButtonText() {
    $('#login-dropdown-list .dropdown-toggle').html("Company Sign in / up<b class='caret'></b>");
}



Template.layout.events({
    'click #logoutButton': function() {
        AccountsTemplates.logout();
    }
});

Template.layout.helpers({
    login: function() {
        var company = Company.findOne();
        var user = User.findOne();
        var returnValue = "";
        if (company) {
            if (company.name) {
                returnValue = company.name;
            } else {
                returnValue = company.email;
            }
        } else if (user) {
            if (user.name) {
                returnValue = user.name;
            } else {
                returnValue = user.email;
            }
        }
        return returnValue;
    },
    isCompanyProfile: function() {
        return Meteor.user() && "company" === Meteor.user().type;
    }, 
    isUserProfile: function() {
        return Meteor.user() && "user" === Meteor.user().type;
    }
});