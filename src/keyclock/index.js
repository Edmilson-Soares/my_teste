import KcAdminClient from 'keycloak-admin';




const kcAdminClient =new KcAdminClient.default({
 baseUrl: 'http://127.0.0.1:8080/auth',
   realmName: 'microaitec',
 
});

// Authorize with username / password
await kcAdminClient.auth({
  username: 'admin',
  password: 'Pa55w0rd',
  grantType: 'password',
  clientId: 'teste',
  totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
});


