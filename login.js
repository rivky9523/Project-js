
const form = document.getElementById('loginForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const allUsersString = localStorage.getItem('users');

    if (!allUsersString) {
        alert("לא קיים משתמש רשום");
        return;
    }

    const allUsers = JSON.parse(allUsersString);
    const user = allUsers.find(user => user.username === username);

    if (!user) {
        alert("שם משתמש לא קיים");
        return;
    }

    if (user.pas !== password) {
        alert("הסיסמה שגויה");
        return;
    }

    localStorage.setItem("current", JSON.stringify(username));
    window.location.href = "./games.html";
});