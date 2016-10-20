Template.companyProfile.helpers({
	company: function() {
	    return Company.findOne(Session.get("selectedCompany"));
	}
});