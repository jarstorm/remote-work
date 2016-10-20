Template.companyIndex.helpers({
	company: function() {
		return Company.findOne(Meteor.userId());
	},
	active_jobs: function() {
		return DBMethods.findActiveJobs(Meteor.userId());
	},
	active_jobs_count: function() {
		return DBMethods.findActiveJobs(Meteor.userId()).count();
	}
});

Template.companyIndex.events({
	'click .delete_job': function(event) {
		event.preventDefault();
		Session.set("selectedJobToRemove", this._id);
		Modal.show('deleteJobModal');
	}, 
	'click #company_index_remove': function(event) {
        event.preventDefault();
        Modal.show('deleteCompanyModal');
    }
});