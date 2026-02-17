const allUsersString = localStorage.getItem('users');
const allUsers = JSON.parse(allUsersString);
console.log(allUsers);
const username = JSON.parse(localStorage.getItem('current'))
console.log(username);
const user = allUsers.filter(user => {
if(user.username  == username)
{
return user
} 
} );
console.log(user);

document.getElementById('hello').textContent=` שלום ${username}`;
document.getElementById('hello2').textContent=`השיא שלך ${user[0].point}`;
const pas=localStorage.getItem("current");