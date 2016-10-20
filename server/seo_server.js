SeoCollection.update(
  {
      route_name: 'main'
  },
  {
      $set: {
          route_name: 'main',
          title: 'Watho work at home',
          meta: {
              'description': 'Watho is a new startup focused on giving the opportunity to people to work at home.'
          },
          og: {
              'title': 'Watho work at home',
              'image': 'http://watho.net/logo_brand.png'
          }
      }
  },
  {
      upsert: true
  }
);

SeoCollection.update(
  {
      route_name: 'howItWorks'
  },
  {
      $set: {
          route_name: 'howItWorks',
          title: 'How it works | Watho',
          meta: {
              'description': 'Companies post remote jobs. Applicants browse our site and find a job to work at home'
          },
          og: {
              'title': 'How it works | Watho',
              'image': 'http://watho.net/logo_brand.png'
          }
      }
  },
  {
      upsert: true
  }
);

SeoCollection.update(
  {
      route_name: 'pricing'
  },
  {
      $set: {
          route_name: 'pricing',
          title: 'Pricing | Watho',
          meta: {
              'description': 'Free for applicants. Companies only pay when create a job. From $50 to $100'
          },
          og: {
              'title': 'Pricing | Watho',
              'image': 'http://watho.net/logo_brand.png'
          }
      }
  },
  {
      upsert: true
  }
);

SeoCollection.update(
  {
      route_name: 'terms'
  },
  {
      $set: {
          route_name: 'terms',
          title: 'Terms | Watho',
          meta: {
              'description': 'Purpose and Ownership of Watho'
          },
          og: {
              'title': 'Terms | Watho',
              'image': 'http://watho.net/logo_brand.png'
          }
      }
  },
  {
      upsert: true
  }
);