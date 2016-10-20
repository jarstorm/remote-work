Template.jobSearchInput.events({
  'submit form': function (event) {
    event.preventDefault();
    Router.go("/job_search_results/"+$('#job_serach_input').val());
    
    // Reset advanced filters
    Session.set("advancedSearchDiv", false);
    JobSearchFiltersMethods.resetFilters();
  }
});

Template.jobSearchInput.helpers({
	text: function() {
	  return Session.get("searchObject").text;
	}
});
