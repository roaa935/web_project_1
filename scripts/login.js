
document.addEventListener('DOMContentLoaded', function () {

    const loginBtn = document.getElementById('login-btn');
    loginBtn.addEventListener('click', function () {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email == "" || password == "") {
            alert("Please fill in all fields.");
        } else {
            let users = JSON.parse(localStorage.getItem('users')) || [];

            let foundUser = users.find(user => user.email == email && user.password == password);

            if (foundUser) {
                localStorage.setItem('currentUserId', foundUser.id);
                console.log('Login successful with User ID: ' + foundUser.id);
                alert('Login successful with User ID: ' + foundUser.id);

                if (foundUser.isAdmin) {
                    window.location.href = '../pages/AdminHome.html';
                } else {
                    window.location.href = '../pages/UserHome.html';
                }

            } else {
                alert('Invalid email or password.');
            }
        }
    });
});