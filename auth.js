const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;


// Define an Okta client so any user management tasks can be performed
const oktaClient = new okta.Client({
  orgUrl: 'https://dev-269919.oktapreview.com',
  token: '00LVFEmA-rxEQKjPWU25DGKKd_NiwJaFh0FbK2ZWio'
});

// Define the OpenID Connect client
const oidc = new ExpressOIDC({
  issuer: "https://dev-269919.oktapreview.com/oauth2/default",
  client_id: "0oah374pqlsvtrldG0h7",
  client_secret: "AYClrlztR1X0IzCuHY0nTBCgG71nKT70so4DhjEc",
  redirect_uri: "http://localhost:3000/users/callback",
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});


module.exports = { oidc, oktaClient };
