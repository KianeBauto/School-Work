function compareLogin(event){
    event.preventDefault();

    const USERNAME = "User";
    const PASSWORD = "1234";
    const userName = document.getElementById("username").value;
    const passWord = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage").value;
    if(userName === USERNAME && passWord === PASSWORD){
        alert("Welcome back " + USERNAME + " Admin!");
        window.location.href = "LoggedIn.html";
    }else{
        alert("Wrong Username/Password Please Try Again!");
        errorMessage.textContent = "Invalid Username or Password!";

    }
}

const myLogInButton = document.getElementById("btnLogIn");
myLogInButton.addEventListener('click', compareLogin);