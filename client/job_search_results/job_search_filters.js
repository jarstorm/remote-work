Template.jobSearchFilters.helpers({
  disable: function (component_id) {
    var checked = Session.get(component_id);
    return checked ? "" : "disabled";
  },
  getProperty: function(propertyId){
    return Session.get(propertyId);
  },
  getAdvancedSearchClass: function() {
     return Session.get("advancedSearchDiv") ? "advancedSearchButton" : "";
  },
  text: function() {
    return Session.get("searchObject").text;
  }
});

Template.jobSearchFilters.events({
  'submit form': function (event) {
    event.preventDefault();
    
    // Reset advanced filters
    Session.set("advancedSearchDiv", false);
    JobSearchFiltersMethods.resetFilters();
    
    var searchText = $('#job_serach_input').val();
    Router.go("/job_search_results/" + searchText);
  },
  'click .checkbox' : function(event) {
      Session.set(event.target.id, $('#'+event.target.id).prop("checked"));
  },
  'click #advancedSearchText': function(event) {
      var newValue = !Session.get("advancedSearchDiv");
      if (!newValue) {
        JobSearchFiltersMethods.resetFilters();
      }
      Session.set("advancedSearchDiv", newValue);
  }, 
  'click #officeSupportMenuOption': function(event) {
    Session.set("isOfficeSupportSelected", !Session.get("isOfficeSupportSelected"));
    
  }, 
  'click #officeSupportMenuList': function(event) {
    Session.set("isOfficeSupportSelected", !Session.get("isOfficeSupportSelected"));
    Session.set("selectedOfficeSupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconOfficeSupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.office = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }, 
  'click #travelSupportMenuOption': function(event) {
    Session.set("isTravelSupportSelected", !Session.get("isTravelSupportSelected"));
    
  }, 
  'click #travelSupportMenuList': function(event) {
    Session.set("isTravelSupportSelected", !Session.get("isTravelSupportSelected"));
    Session.set("selectedTravelSupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconTravelSupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.travel = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }, 
  'click #trainingSupportMenuOption': function(event) {
    Session.set("isTrainingSupportSelected", !Session.get("isTrainingSupportSelected"));
    
  }, 
  'click #trainingSupportMenuList': function(event) {
    Session.set("isTrainingSupportSelected", !Session.get("isTrainingSupportSelected"));
    Session.set("selectedTrainingSupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconTrainingSupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.training = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }, 
  'click #timeSupportMenuOption': function(event) {
    Session.set("isTimeSupportSelected", !Session.get("isTimeSupportSelected"));
    
  }, 
  'click #timeSupportMenuList': function(event) {
    Session.set("isTimeSupportSelected", !Session.get("isTimeSupportSelected"));
    Session.set("selectedTimeSupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconTimeSupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.overlap = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }, 
  'click #equitySupportMenuOption': function(event) {
    Session.set("isEquitySupportSelected", !Session.get("isEquitySupportSelected"));
    
  }, 
  'click #equitySupportMenuList': function(event) {
    Session.set("isEquitySupportSelected", !Session.get("isEquitySupportSelected"));
    Session.set("selectedEquitySupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconEquitySupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.equity = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }, 
  'click #countrySupportMenuOption': function(event) {
    Session.set("isCountrySupportSelected", !Session.get("isCountrySupportSelected"));
    
  }, 
  'click #countrySupportMenuList': function(event) {
    Session.set("isCountrySupportSelected", !Session.get("isCountrySupportSelected"));
    Session.set("selectedCountrySupportMenuOption", event.target.getAttribute('selected'));
    Session.set("iconCountrySupportMenuOption", event.target.getAttribute('icon'));
    var searchObject = Session.get("searchObject");
    searchObject.country = event.target.getAttribute('value');
    Session.set("searchObject", searchObject);
  }
});


JobSearchFiltersMethods = (function () {
    var methods = {};
    methods.resetFilters = function() {
      Session.set("isOfficeSupportSelected", false);
      Session.set("selectedOfficeSupportMenuOption", "");
      Session.set("iconOfficeSupportMenuOption", "");    
      
      Session.set("isTravelSupportSelected", false);
      Session.set("selectedTravelSupportMenuOption", "");
      Session.set("iconTravelSupportMenuOption", "");    
      
      Session.set("isTrainingSupportSelected", false);
      Session.set("selectedTrainingSupportMenuOption", "");
      Session.set("iconTrainingSupportMenuOption", "");    
      
      Session.set("isTimeSupportSelected", false);
      Session.set("selectedTimeSupportMenuOption", "");
      Session.set("iconTimeSupportMenuOption", "");    
      
      Session.set("isEquitySupportSelected", false);
      Session.set("selectedEquitySupportMenuOption", "");
      Session.set("iconEquitySupportMenuOption", "");    
      
      Session.set("isCountrySupportSelected", false);
      Session.set("selectedCountrySupportMenuOption", "");
      Session.set("iconCountrySupportMenuOption", "");  
      
      var searchObject = Session.get("searchObject");  
      delete searchObject.office;
      delete searchObject.travel;
      delete searchObject.training;
      delete searchObject.overlap;
      delete searchObject.equity;
      delete searchObject.country;
      
      Session.set("searchObject", searchObject);  
    }
    return methods;
})();