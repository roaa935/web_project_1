
// function for email validation
function isValidEmail(email) {
    var emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

function isExistEmail(email) {

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered email already exists in the user list
    return users.some(user => user.email == email);

}

function isValidPassword(password, confirmPassword) {

    return password == confirmPassword;
}

document.addEventListener('DOMContentLoaded', function () {

    // Get the radio buttons and company info fields container
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const companyInfoFields = document.getElementById('companyInfoFields');

    // Function to toggle visibility of company info fields
    function toggleCompanyInfoFields() {
        let isAdmin = document.querySelector('input[name="userType"]:checked').value == 'admin';
        companyInfoFields.style.display = isAdmin ? 'block' : 'none';

    }

    // Add event listener to radio buttons
    userTypeRadios.forEach(radio => {
        radio.addEventListener('change', toggleCompanyInfoFields);
    });

    // Initially toggle visibility based on default radio button selection
    toggleCompanyInfoFields();

    // Submit button click event
    const signUpBtn = document.getElementById('signUp-btn');
    signUpBtn.addEventListener('click', function () {
        event.preventDefault();
        try {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let confirmPassword = document.getElementById("confirm-password").value;

            if (name == "" || email == "" || password == "" || confirmPassword == "") {
                alert("Please fill in all fields.");
            } else if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
            } else if (!isValidPassword(password, confirmPassword)) {
                alert("Confirm Password does not match.");
            } else if (isExistEmail(email)) {
                alert("This Email is already exist");

            } else {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                let newUser = {};

                // Determine if the user is an admin
                let isAdmin = document.getElementById('userTypeAdmin').checked;

                if (isAdmin) {
                    let companyName = document.getElementById('company-name').value;
                    let companyPhone = document.getElementById('company-phone').value;
                    let companyEmail = document.getElementById('company-email').value;
                    let companyDescription = document.getElementById('company-description').value;
                    let companyAddress = document.getElementById('company-address').value;

                    newUser = {
                        id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
                        name: name,
                        email: email,
                        password: password,
                        company: {
                            name: companyName,
                            phone: companyPhone,
                            email: companyEmail,
                            address: companyAddress,
                            description: companyDescription,
                            logo: 'https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg',
                        },
                        postedJobs: [],
                        isAdmin: true,
                    }
                } else {
                    newUser = {
                        id: users.length == 0 ? 1 : users[users.length - 1].id + 1,
                        name: name,
                        email: email,
                        password: password,
                        appliedJobs: [],
                        isAdmin: false,
                    }
                }

                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUserId', newUser.id);

                alert('You have registered successfully.');

                if (isAdmin) {
                    window.location.href = '../pages/AdminHome.html';
                } else {
                    window.location.href = '../pages/UserHome.html';
                }
            }
        } catch (error) {
            console.log("An error occurred:", error);
            sessionStorage.setItem('errorMessage', error);
        }
    });

});


