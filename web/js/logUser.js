if (document.cookie == "")
  document.write('<li><a href="/login.html">Login</a></li>');
if (document.cookie == "isLoggedIn=true")
  document.write(
    '<li><a href="/profile.html">Profile</a></li><li><a onclick="Logout()">Log out</a></li>'
  );
