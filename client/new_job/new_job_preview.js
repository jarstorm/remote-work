Template.newJobPreview.helpers({
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
        return Session.get("newJobData");
    },
    hasDesiredSkills: function() {
        var returnValue = false;
        var job = Session.get("newJobData");
        if (job) {
            returnValue = job.desired_skills !== '' && job.desired_skills !== '<p><br></p>';
        }
        return returnValue;
    }
});

