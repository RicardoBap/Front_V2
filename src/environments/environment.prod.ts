export const environment = {
  production: true,
  apiUrl: 'https://salvavidas-api.herokuapp.com', //'https://salvavidas-api.herokuapp.com',    /*'https://salvavidas-api.herokuapp.com',*/

  tokenWhitelistedDomains: [ new RegExp('salvavidas-api.herokuapp.com') ],  // salvavidas-api.herokuapp.com
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
