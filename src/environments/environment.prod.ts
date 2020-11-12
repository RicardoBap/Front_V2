export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080', //'https://salvavidas-api.herokuapp.com',    /*'https://salvavidas-api.herokuapp.com',*/

  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],  // salvavidas-api.herokuapp.com
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
