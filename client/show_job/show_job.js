Template.showJob.rendered = function() {
	// Update views only if the viewer is not the owner
	var company_id = Job.findOne(Session.get("selectedJob")).company_id;	
    Meteor.call('updateJobViews', Session.get("selectedJob"), Meteor.userId(), company_id);
}

Template.showJob.helpers({
 isContract: function(contract) {
     return "Contract" === contract;
 },
 showSalary: function(salary, salary_currency) {
  var currency_text = "";
  switch (salary_currency) {
      case "usd":
          currency_text = '<span class="fa fa-dollar"></span>';
          break;
      case "euro":
          currency_text = '<span class="fa fa-euro"></span>';
          break;
      case "gbp":
          currency_text = '<span class="fa fa-gbp"></span>';
          break;
  }
  return "" === salary ? "Not specified" : (salary + " " + currency_text);
 },
 applyWithMail: function(applyMethod) {
     return "email" === applyMethod;
 },
 job: function() {
    return Job.findOne(Session.get("selectedJob"));
 },
 hasDesiredSkills: function() {
  var job = Job.findOne(Session.get("selectedJob"));
  return (job.desired_skills !== '' && job.desired_skills !== '<p><br></p>');
 }
});
