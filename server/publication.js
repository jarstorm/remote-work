Meteor.publish("companyById", function(id) {
    return DBMethods.findCompanyByIdPublication(id);
});

Meteor.publish('findLastJobs', function() {
  return DBMethods.findLastJobs();
});

Meteor.publish('jobById', function(id) {
  return Job.find(id);
});

Meteor.publish('jobSearch', function(searchObject) {
  return DBMethods.findJobs(searchObject);
});

Meteor.publish('activeJobs', function(companyId) {
  return DBMethods.findActiveJobs(companyId);
});

Meteor.publish('loggedUser', function(userId) {
  return DBMethods.getLoggedUser(userId);
});

Meteor.publish('userById', function(userId) {
  return DBMethods.findUserById(userId);
});
