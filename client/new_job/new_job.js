Template.newJob.events({
	'click .navigator'	: function(event) {
		// UNtil the form is valid do nothing
		if (Session.get("newJobFormValid")) {
			var newStep = event.target.getAttribute("stepid");
			NewJobBasicDataHelpers.navigate(newStep);
		}
	}
});

Template.newJob.rendered = function() {
	$('#step1').show();
	$('#step2').hide();
	$('#step3').hide();

 	// wysiwyg elements
	$('.summernote-big').summernote({
		height: 300,
        onkeyup: function() {
            validateEditor();
        },
        onpaste: function() {
            validateEditor();
        }
	});
	$('.summernote-small').summernote({
		height: 100,
        onkeyup: function() {
            validateEditor();
        },
        onpaste: function() {
            validateEditor();
        }
	});	
	
	// Initialize data
	Session.set("newJobSetp2navigatorClass", "navigable_disabled");
	Session.set("newJobSetp3navigatorClass", "navigable_disabled");
	Session.set("newJobFormValid", false);
}


function validateEditor() {
    // Revalidate the content when its value is changed by Summernote
    $('#new_job_form').bootstrapValidator('revalidateField', 'new_job_title');
    $('#new_job_form').bootstrapValidator('revalidateField', 'new_job_description');
    $('#new_job_form').bootstrapValidator('revalidateField', 'new_job_required_skills');
};



Template.newJob.helpers({
	stepReached: function(stepId) {
		return Session.get(stepId);
	},
	stepEnabled: function(stepId) {
		return Session.get(stepId) === "" ? "" : "disabled";
	},
	company: function() {
	    return Company.findOne(Session.get("selectedCompany"));
	}
});


