import {defineAuth, secret} from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      scopes: ['EMAIL'],
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
      },
      signInWithApple: {
        clientId: secret('SIWA_CLIENT_ID'),
        keyId: secret('SIWA_KEY_ID'),
        privateKey: secret('SIWA_PRIVATE_KEY'),
        teamId: secret('SIWA_TEAM_ID'),
      },
      // facebook: {
      //   clientId: secret('FACEBOOK_CLIENT_ID'),
      //   clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
      // },
      callbackUrls: ['iLinkup://callback/'],
      logoutUrls: ['iLinkup://signout/'],
    },
  },
});
