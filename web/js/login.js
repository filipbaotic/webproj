const API_URL = "http://localhost:3000";

const Login = async () => {
  let email = document.forms["login"]["email"].value;
  let password = document.forms["login"]["password"].value;
  const payload = {
    email,
    password,
  };
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  localStorage.setItem("user", JSON.stringify(await response.json()));

  if (localStorage.user[10]) {
    document.cookie = "isLoggedIn=true";
    history.pushState({}, "", "/profile.html");
    location.reload();
    console.log("Logged in successfully");
    location.reload();
  } else {
    document.cookie = "isLoggedIn=";
    alert("Email or password incorrect");
    console.log("Failed to log in");
  }
};
