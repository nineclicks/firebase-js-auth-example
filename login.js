// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var userIdToken = null;

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

firebase.auth().onAuthStateChanged(function(state) {
  updateLogin();

});

var updateLogin = function () {
  if (firebase.auth().currentUser) {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
      // Save the token to a global
      userIdToken = idToken;

      // Hide the auth UI
      $('#firebaseui-auth-container').css('display', 'none');

      // Show the logout bit
      $('#logout').css('display', 'block');

      // Show user image on the logout screen
      $('#user-image').attr('src', firebase.auth().currentUser.photoURL);

      // Show user name on the logout screen
      $('#user-label').text(firebase.auth().currentUser.displayName);

      // Change the login button to show the user name and photo
      $('#login-button')
        .text(firebase.auth().currentUser.displayName)
        .addClass('login-button-image')
        .css('background-image', "url('" + firebase.auth().currentUser.photoURL + "')");

    }).catch(function (error) {
    });
  } else {
    // Clear global token variable
    userIdToken = null;

    // Start the login ui
    ui.start('#firebaseui-auth-container', uiConfig);

    // Return the nav button to login
    $('#login-button')
      .removeClass('login-button-image')
      .css('background-image', "")
      .text('Log in');

    // Show the auth stuff
    $('#firebaseui-auth-container').css('display', 'block');

    // Hide the user/logout stuff
    $('#logout').css('display', 'none');

  }
}

