
Template.latestPublishedJobs.helpers({
    getIndexClass: function(index) {
        return index % 2 == 0 ? "" : "col-md-offset-1 col-sm-offset-1 col-xs-offset-0";
    }, 
    jobs: function() {
    return DBMethods.findLastJobs().map(
    	function(document, index){
	        document.index = index;
	        return document;
	    });
	}
});
