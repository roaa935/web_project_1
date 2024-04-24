// function to get the admin data that post a job
function getAdminById(id) {

    // get the users list to search for the admin object
    let users = JSON.parse(localStorage.getItem('users'));

    // find the admin object that match the same id
    admin = users.find(user => user.id == id);

    return admin;
}

function getUserAppliedJobs() {

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUserId = JSON.parse(localStorage.currentUserId);
    let currentUser = users.find(user => user.id == currentUserId);
    let appliedJobs = currentUser.appliedJobs || [];
    let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    let userAppliedJobs = postedJobs.filter(job => appliedJobs.includes(job.id));

    return userAppliedJobs;

}

// function to create the job card (for User)
function createJobCard(job) {
    // Create job card dynamically
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');

    // Create and set the logo image
    const logoImg = document.createElement('img');
    admin = getAdminById(job.admin);
    logoImg.src = admin.company.logo;
    jobCard.appendChild(logoImg);

    // Create and set the job title
    const jobTitleElement = document.createElement('p');
    jobTitleElement.classList.add('job-title');
    jobTitleElement.textContent = job.title;
    jobCard.appendChild(jobTitleElement);

    // create row div
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row-div');

    const companyNameElement = document.createElement('p');
    companyNameElement.textContent = admin.company.name;
    companyNameElement.classList.add('company-name');
    rowDiv.appendChild(companyNameElement);

    // Create and set the job location
    const jobLocationElement = document.createElement('p');
    jobLocationElement.classList.add('job-location');
    jobLocationElement.textContent = job.location;
    rowDiv.appendChild(jobLocationElement);

    // Create and set the salary
    const salaryElement = document.createElement('p');
    salaryElement.classList.add('job-salary');
    salaryElement.textContent = '$' + job.salary.toLocaleString();
    rowDiv.appendChild(salaryElement);

    jobCard.appendChild(rowDiv);

    // Create and set the job type container
    const jobTypeContainer = document.createElement('div');
    jobTypeContainer.classList.add('job-type-container');

    const jobTypeElement = document.createElement('p');
    jobTypeElement.classList.add('job-type');
    jobTypeElement.textContent = job.type;

    jobTypeContainer.appendChild(jobTypeElement);
    jobCard.appendChild(jobTypeContainer);

    // Create and set the job level container
    const jobLevelContainer = document.createElement('div');
    jobLevelContainer.classList.add('job-level-container');

    const jobLevelElement = document.createElement('p');
    jobLevelElement.classList.add('job-level');
    jobLevelElement.textContent = job.level;

    jobLevelContainer.appendChild(jobLevelElement);
    jobCard.appendChild(jobLevelContainer);


    // create the apply button
    const CancelButton = document.createElement('button');
    CancelButton.classList.add('cancel-button');
    CancelButton.textContent = 'Cancel';
    CancelButton.onclick = function () {


        // update the applied job list of the user
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUserId = JSON.parse(localStorage.currentUserId);
        let currentUser = users.find(user => user.id == currentUserId);
        let appliedJobs = currentUser.appliedJobs;
        currentUser.appliedJobs = appliedJobs.filter(jobId => jobId != job.id);
        localStorage.setItem('users', JSON.stringify(users));

        // update the job application list of the job
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs'));
        console.log(postedJobs);
        let jobToEdit = postedJobs.find(j => j.id == job.id);
        console.log(jobToEdit);
        let jobApplications = jobToEdit.jobApplications;
        console.log(jobApplications);
        jobToEdit.jobApplications = jobApplications.filter(applicant => applicant.applicantId != currentUserId);
        console.log(jobToEdit.jobApplications);
        localStorage.setItem('postedJobs', JSON.stringify(postedJobs));
        console.log(postedJobs);

        alert('Your Job Application Canceled Successfully');

        // Redirect to the posted job page to see the changes
        window.location.href = '../pages/Applied Jobs.html';

    };
    jobCard.appendChild(CancelButton);

    // rerturn the job card for later use
    return jobCard;
}

// function to display the posted jobs
function displayPostedJobs(jobs) {

    // get the job list container (div) to append inside it the job cards
    const jobListContainer = document.getElementById('jobListContainer');

    jobs.forEach(function (job) {
        const card = createJobCard(job);
        jobListContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // Get applied jobs of the current user
    let appliedJobs = getUserAppliedJobs();

    // display the job list if it is not empty
    if (appliedJobs.length != 0) {
        displayPostedJobs(appliedJobs);
    }

});

