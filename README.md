# Firebase Login Example

https://console.firebase.google.com/u/1/

Enable Google and Email/Password in Firebase project auth sign-in methods.

Create `firebaseToken.js` and in it, put your Firebase token like this:

```
var firebaseConfig = {
  apiKey: ".....",
  authDomain: "xxxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxx.firebaseio.com",
  projectId: "xxxxxxx",
  storageBucket: "xxxxxxxx.appspot.com",
  messagingSenderId: "0000000000",
  appId: "......"
};
```

This config can be found in the project settings.

When making a rest call, check if userIdToken has a value to verify user is logged in. If it does, pass it along to the server for verification.

Verify token with https://github.com/nineclicks/python-firebase-validate

Add more login providers https://firebase.google.com/docs/auth/web/firebaseui#oauth_providers_google_facebook_twitter_and_github
