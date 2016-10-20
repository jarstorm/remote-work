Template.deleteJobModal.events({
    'click #deleteJobConfirmButton': function(event) {
        Meteor.call('removeJob', Meteor.userId(), Session.get("selectedJobToRemove"), Messages.showMessageOk("Job removed"));
        Modal.hide();
    }
});

Template.deleteJobModal.helpers({
    job: function() {
        return Job.findOne(Session.get("selectedJobToRemove"));
    }
});
