var UserPermissions = {company: {text: "company"}, user: {text: "user"}, all: {text: "all"}};

function isAuthorised(permission) {
    // cpmpany, user amd all permissions available

    if (UserPermissions.all.text === permission) {

    } else if (UserPermissions.company.text === permission) {
      if (Meteor.user() === undefined || Meteor.user() === null || Meteor.user().type !== UserPermissions.company.text) {
        Router.go('main');
      }
    } else if (UserPermissions.user.text === permission) {
      if (Meteor.user() === undefined || Meteor.user() === null || Meteor.user().type !== UserPermissions.user.text) {
        Router.go('main');
      }
    }
}


Router.map(function() {
  this.route('main', {path: '/',
    onBeforeAction: function (pause) {
      var searchObject = {};
      searchObject.text = "";
      Session.set("searchObject", searchObject);
      Session.set("selectedCompany", Meteor.userId());
      this.next();
    }});
  this.route('howItWorks', {path: '/how_it_works'});
  this.route('terms', {path: '/terms'});
  this.route('pricing', {path: '/pricing'});
  this.route('jobSearchResults', {path: '/job_search_results/:text?',
    onBeforeAction: function (pause) {
      var searchObject = {};
      if (this.params.text) {
        searchObject.text = this.params.text;
      } else {
        searchObject.text = "";
      }
      Session.set("searchObject", searchObject);
      this.next();
    },
    onAfterAction: function() {    
      var text = Session.get("searchObject").text;
      SEO.set({
        title: "Job search " + text + " | Watho",
        meta: {
          'description': "Job search results for " + text
        },
        og: {
          'title': "Job search " + text + " | Watho",
          'description': "Job search results for " + text
        }
      });
    }

  });
  this.route('companyIndex', {
    path: '/company_index',
    waitOn: function () {return Meteor.subscribe('loggedUser', Meteor.userId());},
    onBeforeAction:
      function (pause) {
        Session.set("selectedCompany", Meteor.userId());
        isAuthorised("company");
        this.next();
         }});
  this.route('editCompanyProfile', {path: '/company_profile', waitOn: function () {Meteor.subscribe('loggedUser', Meteor.userId());},
    onBeforeAction: function (pause) {Session.set("selectedCompany", Meteor.userId()); isAuthorised("company");this.next(); }});
  this.route('new_Job', {path: '/new_job', waitOn: function () {Meteor.subscribe('loggedUser', Meteor.userId());},
    onBeforeAction: function (pause) {Session.set("selectedCompany", Meteor.userId()); isAuthorised("company");this.next();}});
  this.route('showJob', {path: '/show_job/:id',
    waitOn: function () {return Meteor.subscribe('jobById', Session.get("selectedJob"));},
    onBeforeAction: function (pause) {Session.set("selectedJob", this.params.id);this.next();},
    onAfterAction: function() {      
      var job = Job.findOne(Session.get("selectedJob"));
      if (job) {
        var descriptionText = job.description.length > 100 ? job.description.substring(0, 100) : job.description;
        SEO.set({
          title: job.title + " | Watho",
          meta: {
            'description': descriptionText
          },
          og: {
            'title': job.title + " | Watho",
            'description': descriptionText
          }
        });
      }
    }
  });
  this.route('editJob', {path: '/edit_job/:id',
    onBeforeAction: function (pause) {Session.set("selectedJob", this.params.id);this.next(); }});
  this.route('showCompany', {path: '/show_company/:id',
    waitOn: function () {return Meteor.subscribe("companyById", Session.get("selectedCompany"));},
    onBeforeAction: function (pause) {Session.set("selectedCompany", this.params.id);this.next(); },
    onAfterAction: function() {      
      var company = Company.findOne(Session.get("selectedCompany"));
      if (company) {
        var descriptionText = company.description.length > 100 ? company.description.substring(0, 100) : company.description;
        SEO.set({
          title: company.name + " | Watho",
          meta: {
            'description': descriptionText
          },
          og: {
            'title': company.name + " | Watho",
            'description': descriptionText
          }
        });
      }
    }
  });

  // User routes
  this.route('userIndex', {
    path: '/user_index',
    onBeforeAction: function (pause) {isAuthorised("user");this.next();}
  });

  this.route('userProfile', {
    path: '/user_profile',
    onBeforeAction: function (pause) {isAuthorised("user");this.next();}
  });

});


Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  onAfterAction: function () {
    // Update google analytics stats
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
    ga('create', 'UA-56373608-1', 'auto');
    ga('require', 'displayfeatures');
    ga('send', 'pageview', Router.current().url);
  }
  
});


