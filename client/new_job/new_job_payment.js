var checkout;

function addNewJob(token) {
	Meteor.call('addNewJob', Session.get("newJobData"), $("#new_job_payment_code").val(), 
	    Session.get("selectedPayment"), getTotalAmount(), Session.get("selectedPaymentDays"), token, 
	        function (error, result) {
	         if (error) {
	             Messages.showMessageError(error.reason);
	         } else {
	             Messages.showMessageOk("New job added");
	             Router.go("/company_index");
	         }
	    });
}


Template.newJobPayment.events({
    'click #addNewJobFinish': function() {
        event.preventDefault();
        if (getTotalAmount() > 0) {
            checkout.open({
                name: 'Watho',
                description: 'Create a new remote job position!',
                amount: getTotalAmount() * 100, // this is cents, not dollars
            });
        } else {
            addNewJob();
        }
    },
    'click #payment_button_basic': function() {
        $("#payment_button_basic").removeClass("paymentSelected");
        $("#payment_button_recommended").removeClass("paymentSelected");
        $("#payment_button_advanced").removeClass("paymentSelected");

        $("#payment_button_basic").addClass("paymentSelected");

        Session.set("selectedPayment", 50);
        Session.set("selectedPaymentDays", 15);
    },
    'click #payment_button_recommended': function() {
        $("#payment_button_basic").removeClass("paymentSelected");
        $("#payment_button_recommended").removeClass("paymentSelected");
        $("#payment_button_advanced").removeClass("paymentSelected");

        $("#payment_button_recommended").addClass("paymentSelected");
        Session.set("selectedPayment", 80);
        Session.set("selectedPaymentDays", 30);
    },
    'click #payment_button_advanced': function() {
        $("#payment_button_basic").removeClass("paymentSelected");
        $("#payment_button_recommended").removeClass("paymentSelected");
        $("#payment_button_advanced").removeClass("paymentSelected");

        $("#payment_button_advanced").addClass("paymentSelected");

        Session.set("selectedPayment", 100);
        Session.set("selectedPaymentDays", 60);
    },'click #new_job_payment_accept': function() {
		Session.set("newJobPaymentTermsAccepted", $('#new_job_payment_accept').prop('checked'));
	}, 'click #new_job_validate_code': function() {
	    Meteor.call('validateNewJobCode', Session.get("selectedCompany"), $("#new_job_payment_code").val(),  function (error, result) {
	         if (error || !result.result) {
	             Session.set("validateNewJobIcon", "glyphicon glyphicon-remove icon_ko");
	         } else {
	             Session.set("newJobDiscount", result.percentage);
	             Session.set("validateNewJobIcon", "glyphicon glyphicon-ok icon_ok");
	         }
	    });
	}

});

Template.newJobPayment.rendered = function() {
    $("#payment_button_advanced").addClass("paymentSelected");
    Session.set("selectedPayment", 100);
    Session.set("selectedPaymentDays", 60);
	Session.set("validateNewJobIcon", "glyphicon glyphicon-remove icon_ko");
	Session.set("newJobDiscount", 0);
	Session.set("newJobPaymentTermsAccepted", false);

    checkout = StripeCheckout.configure({
          key: Session.get("stripePublicKey"),
          image: 'logo_min_black.png',
          // The callback after checkout is complete
          token: function(token) {
            // do something here (a Meteor.method, perhaps?)
            addNewJob(token);
          }
        });

}

Template.newJobPayment.helpers({
    days:  function() {
        return Session.get("selectedPaymentDays");
    },
    total_amount: function() {
        return getTotalAmount();
    },
    isDisabled: function() {
        return Session.get("newJobPaymentTermsAccepted") ? "" : "disabled";
    }
    
});

function getTotalAmount() {
    return Session.get("selectedPayment") - (Session.get("selectedPayment") * Session.get("newJobDiscount"));
}