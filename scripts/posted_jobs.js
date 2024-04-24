// function to get the admin data
function getAdminById() {

    // get the users list to search for the admin object
    let users = JSON.parse(localStorage.getItem('users'));

    // Get the current user (admin) from local storage
    currentUserId = JSON.parse(localStorage.currentUserId);
    currentUser = users.find(user => user.id == currentUserId);
    return currentUser;
}

// function to create the job card (for admin)
function createJobCard(job) {
    // Create job card dynamically
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.classList.add(job.id.toLocaleString());

    // Create and set the logo image
    const logoImg = document.createElement('img');
    admin = getAdminById();
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


    // Create the button-container div
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Create and add the edit button
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        // store the job id of the clicked job
        sessionStorage.setItem('clickedJobId', job.id);
        // open the edit job page to edit the clicked job details
        window.location.href = '../pages/edit job phase 1.html';
    };
    buttonContainer.appendChild(editButton);

    // Create and add the delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {

        // get the list of posted jobs and jobs of current admin
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs'));

        // get the users list to search for the admin object
        let users = JSON.parse(localStorage.getItem('users'));

        // Get the current user (admin) from local storage
        currentUserId = JSON.parse(localStorage.currentUserId);
        currentUser = users.find(user => user.id == currentUserId);
        let admineJobsIDs = currentUser.postedJobs;

        // Use the filter method to create a new array without the object to delete
        postedJobs = postedJobs.filter(j => j.id != job.id);
        admineJobsIDs = admineJobsIDs.filter(id => id != job.id);
        currentUser.postedJobs = admineJobsIDs;

        // updated info in the local storage
        localStorage.setItem('postedJobs', JSON.stringify(postedJobs));
        localStorage.setItem('users', JSON.stringify(users));

        alert('Job Deleted Successfully');

        // Redirect to the posted job page to see the changes
        window.location.href = '../pages/posted jobs.html';

    }
    buttonContainer.appendChild(deleteButton);

    // Add the button-container to the job-card
    jobCard.appendChild(buttonContainer);

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

    // Get all existing jobs from local storage
    let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

    // get the users list to search for the admin object
    let users = JSON.parse(localStorage.getItem('users'));

    // Get the current admin from local storage
    currentUserId = JSON.parse(localStorage.currentUserId);
    currentUser = users.find(user => user.id == currentUserId);

    // Get the jobs IDs posted by that admin
    let adminJobsIDs = currentUser.postedJobs;

    // extract the job objects of matched ids from the all posted jobs list
    const matchedJobsList = postedJobs.filter(job => adminJobsIDs.includes(job.id));

    // display the job list if it is not empty
    if (matchedJobsList.length != 0) {
        displayPostedJobs(matchedJobsList);
    }

});