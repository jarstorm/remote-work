Template.userProfile.helpers({
	user: function() {
	    return User.findOne(Meteor.userId());
	}
});