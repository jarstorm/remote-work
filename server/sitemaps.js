function initializeSiteMap() {
  //WebPages.remove({});
  //WebPages.insert({"name": "how_it_works", lastmod: new Date()});
  //WebPages.insert({"name": "pricing", lastmod: new Date()});
  //WebPages.insert({"name": "job_search_results", lastmod: new Date()});
  //WebPages.insert({"name": "terms", lastmod: new Date()});
    
}

function createSiteMap() {
  sitemaps.add('/sitemap.xml', function() {
    var out = [], pages = WebPages.find().fetch();
    _.each(pages, function(page) {
      out.push({
        page: '/' + page.name,
        lastmod: page.lastUpdated
      });
    });
    return out;
  });
}

Meteor.startup(function () {
    
  // Initialize robots
  robots.addLine('User-Agent: * Disallow:');

  // Sitemap
  initializeSiteMap();
  createSiteMap();

});
