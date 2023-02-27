const API_URL = "http://localhost:3000";

const Register = async () => {
  var email = document.forms["register"]["email"].value;
  var first_name = document.forms["register"]["first_name"].value;
  var last_name = document.forms["register"]["last_name"].value;
  var password = document.forms["register"]["password"].value;
  const post = {
    first_name,
    last_name,
    email,
    password,
  };
  await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  });

  console.log("Registration successful");
};
