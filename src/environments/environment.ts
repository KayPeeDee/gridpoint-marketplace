const DOMAIN = 'http://127.0.0.1:8000';
// const DOMAIN = 'https://grid-point-api.onrender.com' // 'https://grid-point.vercel.app';
const GRID_POINT_URL = 'http://localhost:8989';
const API_URL = `${DOMAIN}/api`;
const REDIRECT_URL = `${GRID_POINT_URL}/auth/callback`;


export const environment = {
  production: false,
  domain: DOMAIN,
  url: API_URL,
  baseUrl: GRID_POINT_URL,
  redirectTo: REDIRECT_URL,
  loginUrl: DOMAIN+'/oauth/authorize?response_type=code&client_id=3&redirect_uri='+GRID_POINT_URL+'/auth/callback',
  oauthCode: {
    grantType: 'authorization_code',
    clientId: 3,
    clientSecret: '9ds7UkYC7OVRbO4yOQkHySWBqIWC7kuHbi6XkGR2',
    redirectUri: REDIRECT_URL,
    responseType: 'code',
    scope: 'openid profile email offline_access'
  },
  refreshToken: {
    grantType: 'refresh_token'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
