Template.editJob.rendered = function() {

	// Initialize job contract select
	var job = Job.findOne(Session.get("selectedJob"));
 	if (job.contract_type === "Contract") {
    	$('#edit_job_contract_period').show();
    } else {
    	$('#edit_job_contract_period').hide();
    }
        
    // wysiwyg elements
	$('.summernote-big').summernote({
		height: 300,
	});
	$('.summernote-small').summernote({
		height: 100,
	});

	$("#edit_job_form").bootstrapValidator({ // initialize the plugin
	    excluded: [':disabled'],
	    feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
        },
        live: 'enabled',
        submitButtons: 'button[type="submit"]',
        fields: {
            edit_job_title: {
                validators: {
                        notEmpty: {
                            message: 'The title is required and cannot be empty'
                        }
                    }
            },
        }
    }).on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();
        var companyId = Meteor.userId();
        var jobInfo = collectDataFromForm();
	    Meteor.call('updateJob', companyId, Session.get("selectedJob"), jobInfo, function (error, result) {
          if (error) {
            Messages.showMessageError("Server error. Job info cannot be updated");
          } else {
            Messages.showMessageOk("Job info updated successfully");
          }
          Router.go("/company_index");
	    });
    });

}

function collectDataFromForm() {

		var data = {};
		data.views = 0;
		// Company data
		var company = Company.findOne();
		if (company) {
			data.company_id = company._id;
			data.company_name = company.name;
			data.company_email = company.email;

			// Basic data
			data.title = $('#edit_job_title').val();
			data.description = $('#edit_job_description').code();
			data.required_skills = $('#edit_job_required_skills').code();
			data.desired_skills = $('#edit_job_desired_skills').code();
			data.contract_type = $('#edit_job_contract_type').val();
			if ("Contract" === $('#edit_job_contract_type').val()) {
				data.contract_period = $('#edit_job_contract_period').val();
			}
			data.salary = $('#edit_job_salary').val();
			data.salary_currency = $('#salary_option_button').val(); 
			data.apply = $('#edit_job_apply').val();
			data.apply_text = $('#edit_job_apply_text').val();
			
			// Advanced data
			data.office_support = $('#edit_job_office_support').prop('checked');
			data.office_support_text = $('#edit_job_office_support_text').val();
			data.travel = $('#edit_job_travel').prop('checked');
			data.travel_text = $('#edit_job_travel_text').val();
			data.training = $('#edit_job_training').prop('checked');
			data.training_text= $('#edit_job_training_text').val();
			data.overlap = $('#edit_job_overlap').prop('checked');
			data.overlap_text = $('#edit_job_overlap_text').val();
			data.equity = $('#edit_job_equity').prop('checked');
			data.equity_value = $('#edit_job_equity_text').val();
			data.ask_linkedin = $('#edit_job_linkedin').prop('checked');
			data.ask_github = $('#edit_job_github').prop('checked');
			data.country = $('#edit_job_country').prop('checked');
			data.country_text = $('#edit_job_country_text').val();

		}
		return data;
};


Template.editJob.helpers({
    isEnabled: function(element) {
        return element ? "" : "disabled";
    },
    optionSelected: function(element, dataValue) {
        return element === dataValue ? "selected" : "";
    },
    job: function() {
	    return Job.findOne(Session.get("selectedJob"));
	} 
});


Template.editJob.events({
	'change #edit_job_contract_type': function() {
		if ($('#edit_job_contract_type').val() === "Contract") {
        	$('#edit_job_contract_period').show();
        } else {
        	$('#edit_job_contract_period').hide() ;
        }
	},
	'click #edit_job_apply': function() {
        if ("email" === $('#new_job_apply').val()) {
            var company = Company.findOne(Session.get("selectedCompany"));
            $('#edit_job_apply_text').val(company.email);
        } else {
            $('#edit_job_apply_text').val('');
        }
    }
});
