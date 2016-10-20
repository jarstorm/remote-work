Deps.autorun(function() {
    Meteor.subscribe("companyById", Session.get("selectedCompany"));
    Meteor.subscribe('findLastJobs');
    Meteor.subscribe('jobById', Session.get("selectedJob"));
    Meteor.subscribe('jobSearch', Session.get("searchObject"));
    Meteor.subscribe('activeJobs', Session.get("selectedCompany"));
    Meteor.subscribe('loggedUser', Meteor.userId());
    Meteor.subscribe('userById', Meteor.userId());
});
