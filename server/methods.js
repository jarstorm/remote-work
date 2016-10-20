Meteor.startup(function () {
    Meteor.methods({

        updateCompanyProfile: function (companyId, company) {
            Company.update({'_id': companyId}, company);
        },
        addNewJob: function(data, discountCode, totalMoney, moneyToPay, days, token) {
            // Validate code again
            var codeValidation = DiscountMethods.validateDiscount(data.company_id, discountCode);            

            // Check the money and the code validation
            if (codeValidation.result) {
                if (moneyToPay !== (totalMoney - totalMoney * codeValidation.percentage)) {
                    throw new Meteor.Error(469, 'Sorry. The money it´s not correct.');
                }
            } else if (moneyToPay !== totalMoney) {
                throw new Meteor.Error(469, 'Sorry. The money it´s not correct.');
            }
            
            // Selected plan
			data.plan = days;
			var planDays = data.plan * 24 *60 * 60 * 1000;
			data.expiration = data.created_on + planDays;
			
			if (moneyToPay > 0) {
                // Call Stripe     
                // Test
                //var stripePrivateKey = 'sk_test_Tj2On508bl6Z4nEPQNUNrsXb';
                
                //Production
                var stripePrivateKey = 'sk_live_1K82vtMj9evwht8ghpStyooA';
                
                var Stripe = StripeAPI(stripePrivateKey);
                var stripeSync = Meteor.wrapAsync(Stripe.charges.create,Stripe.charges);
                
                stripeSync({
                    amount: moneyToPay * 100, // this is in cents, not dollars
                    currency: "USD",
                    card: token.id
                    }, function (error, result) {
                        if (error) {
                            console.log(error);
                            throw new Meteor.Error(469, 'There was a problem with the payment.');
                        } else {
                            addNewJob(data);
                        }    
                }); 
			} else {
			    addNewJob(data);
			}
                
        },
        validateNewJobCode: function(companyId, code) {
        	return DiscountMethods.validateDiscount(companyId, code);
        },
        removeJob: function(companyId, jobId) {
        	Job.remove(jobId);
        },
        updateJobViews: function(jobId, currentUser, ownerId) {
            if (ownerId !== currentUser) {    
            	Job.update(jobId, {$inc: {views: 1}});
            }
        },
        updateJob: function (companyId, jobId, jobInfo) {
            Job.update({'_id': jobId}, {$set: {title: jobInfo.title, 
                                            description: jobInfo.description, 
                                            required_skills: jobInfo.required_skills, 
                                            desired_skills: jobInfo.desired_skills,
                                            salary: jobInfo.salary,
                                            salary_currency: jobInfo.salary_currency,
                                            office_support: jobInfo.office_support,
                                            office_support_text: jobInfo.office_support_text,
                                            travel: jobInfo.travel,
                                            travel_text: jobInfo.travel_text,
                                            training: jobInfo.training,
                                            training_text: jobInfo.training_text,
                                            overlap: jobInfo.overlap,
                                            overlap_text: jobInfo.overlap_text,
                                            country: jobInfo.country,
                                            country_text: jobInfo.country_text,
                                            equity: jobInfo.equity,
                                            equity_text: jobInfo.equity_text,
                                            ask_linkedin: jobInfo.ask_linkedin,
                                            ask_github: jobInfo.ask_github,
                                            contract_type: jobInfo.contract_type,
                                            contract_period: jobInfo.contract_period,
            }});
        },
        removeCompanyProfile: function(companyId) {
            Company.remove(companyId);
            Meteor.users.remove(companyId);
            Job.remove({company_id: companyId});
        }
    });
});


function addNewJob(data) {
    var jobId = Job.insert(data);
	Twit.post('statuses/update', 
    	{ status: 'New job posted: ' + data.title + ' at ' + data.company_name + '. URL: http://www.watho.net/show_job/' + jobId }, 
    	function(err, data, response) {
    	    if(err) {
                console.log(err);
    	    }
        });
}