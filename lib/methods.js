DBMethods = (function () {
    var methods = {};
    methods.findLastJobs = function() {
        return Job.find({}, {sort: {created_on: -1}, limit: 4});
    };
    methods.findCompanyByIdPublication = function(id) {
        return Company.find(id);
    };
    methods.findJobs = function(searchObject) {
        var filters = getFilters(searchObject);
        if (searchObject) {
            return Job.find({office_support: {$in: filters.office}, travel: {$in: filters.travel}, training: {$in: filters.training},
                        overlap: {$in: filters.overlap}, equity: {$in: filters.equity}, country: {$in: filters.country},
                            $or: [{"title" : {$regex : ".*"+searchObject.text+".*", $options: 'i'}},
                                {"description" : {$regex : ".*"+searchObject.text+".*", $options: 'i'}},
                                {"required_skills" : {$regex : ".*"+searchObject.text+".*", $options: 'i'}},
                                {"desired_skills" : {$regex : ".*"+searchObject.text+".*", $options: 'i'}}]},
                        {sort: {created_on: -1}});
        }
    };
    methods.findActiveJobs = function(companyId) {
        return Job.find({company_id: companyId},
                        {sort: {created_on: -1}});
    };
    methods.getLoggedUser = function(userId) {
        return Meteor.users.find({_id: userId}, {fields: {'type': 1}});  
    };
    methods.findUserById = function(userId) {
        return User.find(userId);  
    };
    return methods;
})();

function getFilters(searchObject) {
    var filter = {};
    if (searchObject) {
        // Office support
        if (searchObject.office === "y") {
            filter.office = [true];
        } else if (searchObject.office === "n") {
            filter.office = [false];
        } else {
            filter.office = [true, false];
        }
        // Travel
        if (searchObject.travel === "y") {
            filter.travel = [true];
        } else if (searchObject.travel === "n") {
            filter.travel = [false];
        } else {
            filter.travel = [true, false];
        }
        // Training
        if (searchObject.training === "y") {
            filter.training = [true];
        } else if (searchObject.training === "n") {
            filter.training = [false];
        } else {
            filter.training = [true, false];
        }
        // Overlap
        if (searchObject.overlap === "y") {
            filter.overlap = [true];
        } else if (searchObject.overlap === "n") {
            filter.overlap = [false];
        } else {
            filter.overlap = [true, false];
        }
        // Equity
        if (searchObject.equity === "y") {
            filter.equity = [true];
        } else if (searchObject.equity === "n") {
            filter.equity = [false];
        } else {
            filter.equity = [true, false];
        }
        // COuntry
        if (searchObject.country === "y") {
            filter.country = [true];
        } else if (searchObject.country === "n") {
            filter.country = [false];
        } else {
            filter.country = [true, false];
        }
    }
    
    return filter;
}

WathoUtils = (function () {
    var methods = {};
    methods.parseDate = function(timestamp) {
        var returnValue = "-";
        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        if (timestamp) {
            var d = new Date(timestamp);
            var curr_date = d.getDate();
            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();
            var curr_hour = d.getHours();
            var curr_min = d.getMinutes();
            var actualDate = new Date();
            if (curr_min.toString().length == 1) {
                curr_min = '0' + curr_min;
            }
    
            if (actualDate.getDate() === curr_date && actualDate.getMonth() === curr_month && d.getFullYear() === curr_year) {
                returnValue = "Today at " + curr_hour + ':' + curr_min;
            } else { 
                returnValue = curr_date + ' ' + monthNames[curr_month] + ' ' + d.getFullYear();
            }
        }
            
        return returnValue;    
    };
    return methods;
})();