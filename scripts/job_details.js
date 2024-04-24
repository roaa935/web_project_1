// function to get the object of the clicked job
function findJobById() {

    // Get the job id of the clicked job from the session storage
    const id = sessionStorage.clickedJobId;

    // Get all posted jobs from local storage
    const postedJobs = JSON.parse(localStorage.getItem('postedJobs'));

    // search for the job that match the same id 
    const job = postedJobs.find(job => job.id == id);

    return job;

}

// function to display the details of the selected job
function displayDetails(job) {

    document.getElementById('job-title').innerHTML = job.title;
    document.getElementById('job-descrption').innerHTML = job.description;
    document.getElementById('job-location').innerHTML = 'Location: ' + job.location;
    document.getElementById('job-type').innerHTML = 'Job Type: ' + job.type;
    document.getElementById('job-level').innerHTML = 'Job Level: ' + job.level;
    document.getElementById('job-salary').innerHTML = 'Salary: ' + job.salary;
}

// function for email validation
function isValidEmail(email) {
    var emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}

document.addEventListener('DOMContentLoaded', function () {

    // get the job
    job = findJobById();

    // display its details
    displayDetails(job);

    // onClick function for the apply button
    document.getElementById("apply").addEventListener("click", function (event) {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let portfolioLink = document.getElementById("link").value;
        let cv = document.getElementById("CV").value;
        let textArea = document.getElementById("TA").value;

        if (name == "" || email == "" || portfolioLink == "" || cv == "") {
            alert("Please fill in all fields.");
            event.preventDefault();
        } else if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault();
        } else {

            // get the users list to search for the user object
            let users = JSON.parse(localStorage.getItem('users'));

            // Get the current user from local storage
            currentUserId = JSON.parse(localStorage.currentUserId);
            currentUser = users.find(user => user.id == currentUserId);

            // update the user applied jobs and the users list
            currentUser.appliedJobs.push(new Number(sessionStorage.clickedJobId));
            localStorage.setItem('users', JSON.stringify(users));

            // create the job application to be added
            let jobApplication = {
                applicantId: currentUserId,
                name: name,
                email: email,
                portfolioLink: portfolioLink,
                cv: cv,
                coverLetter: textArea,
            };

            // find the job from the posted jobs to update its applications
            let postedJobs = JSON.parse(localStorage.getItem('postedJobs'));
            const jobId = sessionStorage.clickedJobId;
            const index = postedJobs.findIndex(job => job.id == jobId);
            let jobToEdit = postedJobs[index];
            jobToEdit.jobApplications.push(jobApplication);
            postedJobs[index] = jobToEdit;
            localStorage.setItem('postedJobs', JSON.stringify(postedJobs));

            alert("You Applied to this Job Successfully");
            window.location.href = '../pages/Applied Jobs.html';

        }
    });

});