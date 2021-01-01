export const environment = {
  production: true,
  apiUrl: 'https://salvavidas-api.herokuapp.com',   //'https://salvavidas-api.herokuapp.com',    'http://localhost:8080'

  tokenWhitelistedDomains: [ new RegExp('salvavidas-api.herokuapp.com') ],  // salvavidas-api.herokuapp.com   'localhost:8080'
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
