
const form = document.getElementById('signupForm');
let arrUsers
arrUsers = JSON.parse(localStorage.getItem('users'))
if (!arrUsers)
  arrUsers = []
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  if (password !== confirmPassword) {
    alert('הסיסמאות אינן תואמות.');
    return;
  }
  let user = {};
  user.username = username;
  user.pas = password;
  user.point = 0
  console.log(user);
  arrUsers.push(user);
  console.log(arrUsers);
  alert('ההרשמה הצליחה!');
  localStorage.setItem('users', JSON.stringify(arrUsers));
  localStorage.setItem("current", JSON.stringify(username));
  window.location.href = "./games.html"
}
);


