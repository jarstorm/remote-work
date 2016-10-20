Template.deleteCompanyModal.events({
    'click #deleteCompanyConfirmButton': function(event) {
        event.preventDefault();
        var companyId = Meteor.userId();
        Meteor.call('removeCompanyProfile', companyId, function (error, result) {
	         if (error) {
	             Messages.showMessageError(error);
	         } else {
	             Meteor.logout(Messages.showMessageOk("Company profile removed successfully"));
	         }
	    });
	    Modal.hide();
    }
});
