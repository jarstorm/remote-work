Meteor.startup(function () {
    
    Company._ensureIndex({ "_id": 1});
    Job._ensureIndex({ "_id": 1});
    Job._ensureIndex({ "company_id": 1});
    Discount._ensureIndex({ "_id": 1});

});

