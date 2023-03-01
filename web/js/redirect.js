// redirects from profile to login, if the user is not logged in
if (window.location.pathname == "/profile.html" && document.cookie == "") {
  history.pushState({}, "", "./login.html");
  location.reload();
}

// redirects from login to profile if the user is logged in
if (
  (window.location.pathname == "/login.html" ||
    window.location.pathname == "/register.html") &&
  document.cookie == "isLoggedIn=true"
) {
  history.pushState({}, "", "./profile.html");
  location.reload();
}
