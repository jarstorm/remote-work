Template.jobSearchResults.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: false,
            fields: [
                { key: 'title', label: 'Title',  fn: function (value, object) { return new Spacebars.SafeString('<a href="/show_job/'+object._id+'" class="table_cell_ellipsis_text primary_link">'+value+'</a>'); } },
                { key: 'company_name', label: 'Company',  fn: function (value, object) { return new Spacebars.SafeString('<a href="/show_company/'+object.company_id+'" class="table_cell_ellipsis_text secondary_link">'+value+'</a>'); } },
                { key: 'contract_type', label: 'Contract type' },
                { key: 'created_on', label: 'Created on', fn: function (value, object) { return WathoUtils.parseDate(value); } },
                { key: 'created_on', label: 'created-hidden', sort: 'descending', hidden: true }
            ] 
        };
    },
    results: function() {
        return DBMethods.findJobs(Session.get("searchObject")).map(function(document, index){
                document.index = index;
                return document;
            });
    },
    job_count: function() {
        return DBMethods.findJobs(Session.get("searchObject")).count();
    }
});

Template.jobSearchResults.rendered =  function() {
    // Hide this component using JQuery because there is no configuration option
    $('.rows-per-page').hide();
};