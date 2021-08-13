let getID = id => document.getElementById(id);

let passLogin = /^[a-zA-Z]{4,16}$/;
getID('login').onchange = function(){
  let login = passLogin.test(this.value);
  console.log(login);
}

let passPassword = /^[a-z0-9\-._]{4,16}$/;
getID('password').onchange = function(){
   let password = passPassword.test(this.value);
  console.log(password);
}

let passEmail = /^[a-z0-9\-.]+@[a-z]+\.[a-z]+$/;
getID('email').onchange = function(){
  let email = passEmail.test(this.value);
  console.log(email);
}

let user;
let userMassive = [];
if(login && password && email){
  getID('add-user').onclick = function addUser(){
    let loginValue = getID('login').value;
    let passwordValue = getID('password').value;
    let emailValue = getID('email').value;
    user = {
      login: loginValue,
      password: passwordValue,
      email: emailValue
    };
    console.log(user);
    userMassive.push(user);
    console.log(userMassive);
    getID('login').value = '';
    getID('password').value = '';
    getID('email').value = '';
    render();
  }

  function render() {
    document.querySelector('tbody').innerHTML = '';
    for (let i = 0; i < userMassive.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i+1}</td>
        <td>${userMassive[i].login}</td>
        <td>${userMassive[i].password}</td>
        <td>${userMassive[i].email}</td>
        <td><input type='button' class = 'editBtn btn edit' id = 'editBtn' name = 'edit' value = 'Edit'></td>
        <td><input type='button' class = 'deleteBtn btn delete' id = 'deleteBtn' name = 'delete' value = 'Delete'></td>`;
        getID('users-list').append(row);
      }
  } 
}


document.querySelector('tbody').onclick = event =>
event.target.classList.contains('edit') ? editUser(event) :
event.target.classList.contains('delete') ? deleteUser(event) : 0 ;

function deleteUser(event) {
  let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  userMassive.splice(index, 1);
  render();
}

let userIndex
function editUser(event) {
  userIndex = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
  let edit = userMassive[userIndex];
  console.log(edit);
  getID('login').value = edit.login;
  getID('password').value = edit.password;
  getID('email').value = edit.email;
  getID('add-user').hidden = true;
  getID('edit-user').hidden = false;
}

getID('edit-user').onclick = function saveEditUser(){
  let saveLogin = getID('login').value;
  let savePassword = getID('password').value;
  let saveEmail = getID('email').value;
  getID('add-user').hidden = false;
  getID('edit-user').hidden = true;
  getID('login').value = "";
  getID('password').value = "";
  getID('email').value = "";
  user.login = saveLogin;
  user.password = savePassword;
  user.email = saveEmail;
  render();
}

