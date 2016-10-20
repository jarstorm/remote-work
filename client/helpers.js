UI.registerHelper("prettifyDate", function(timestamp) {
    return WathoUtils.parseDate(timestamp);    
});


UI.registerHelper("isToday", function(timestamp) {
    var returnValue = "";
    if (timestamp) {
        var d = new Date(timestamp);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();
        var actualDate = new Date();

        if (actualDate.getDate() === curr_date && actualDate.getMonth() + 1 === curr_month && d.getFullYear() === curr_year) {
            returnValue = "today";
        } 
    }
        
    return returnValue;    
});

UI.registerHelper("getSessionProperty", function(property) {
    return Session.get(property);    
});


UI.registerHelper("filesPath", function(imagePath) {
    return Session.get("filesPath") + imagePath;    
});
