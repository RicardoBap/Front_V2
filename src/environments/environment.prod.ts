export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080',   //'https://salvavidas-api.herokuapp.com',    'http://localhost:8080'

  tokenWhitelistedDomains: [ new RegExp('localhost:8080') ],  // salvavidas-api.herokuapp.com   'localhost:8080'
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
