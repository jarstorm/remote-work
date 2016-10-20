Template.showCompany.helpers({
	active_jobs: function() {
		return DBMethods.findActiveJobs(Session.get("selectedCompany"));
	}
});