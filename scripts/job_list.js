
// these objects were just for testing
let company1 = {
    id: 1,
    name: 'Creative Design',
    logo: 'https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg',
    address: 'california, USA',
    email: 'company1@gmail.com',
    phone: '00000000',
    describtion: 'Company Description'
};

let admin = {
    id: 1,
    name: 'Ahmed',
    email: 'admin@gmail.com',
    password: '0000000',
    company: company1,
    postedJobs: JSON.parse(localStorage.postedJobs)
};

let job1 = {
    id: 1,
    title: 'Graphic Designer',
    category: 'Design',
    type: 'Part Time',
    level: 'Senior',
    location: 'New York, USA',
    description: 'Job Description',
    salary: 15000,
    admin: admin
};

let job2 = {
    id: 2,
    title: 'Data Analyst',
    category: 'Software Development',
    type: 'Remote',
    level: 'Senior',
    location: 'New York, USA',
    description: 'Job Describtion',
    salary: 10000,
    admin: admin
};

let job3 = {
    id: 3,
    title: 'Flutter Developer',
    category: 'Software Development',
    type: 'Part Time',
    level: 'Junior',
    location: 'New York, USA',
    description: 'Job Describtion',
    salary: 6000,
    admin: admin
};

// function to get the admin data that post that job
function getAdminById(id) {

    // get the users list to search for the admin object
    let users = JSON.parse(localStorage.getItem('users'));

    // find the admin object that match the same id
    admin = users.find(user => user.id == id);

    return admin;
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
    const applyButton = document.createElement('button');
    applyButton.classList.add('apply-button');
    applyButton.textContent = 'Apply';
    applyButton.onclick = function () {
        // store the job id of the clicked job
        sessionStorage.setItem('clickedJobId', job.id);
        // open the job details page to show the clicked job details and the application form
        window.location.href = '../pages/JobDetails.html';
    };
    jobCard.appendChild(applyButton);

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

    // check first if the user search for something or not
    const isSearch = JSON.parse(sessionStorage.getItem('isSearch'));
    console.log(isSearch);


    if (isSearch) {

        const jobTitle = sessionStorage.getItem('searchedJobTitle').trim().toLowerCase();
        const jobLevel = sessionStorage.getItem('searchedJobLevel').toLowerCase();

        // Retrieve the posted jobs list from session storage
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

        // Filter the posted jobs based on search criteria
        const filteredJobs = postedJobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(jobTitle);
            const levelMatch = job.level.toLowerCase() == jobLevel;
            return titleMatch && levelMatch;
        });

        // display the job list if it is not empty
        if (filteredJobs.length != 0) {
            displayPostedJobs(filteredJobs);
        }

    } else {

        // Get all existing jobs from local storage
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

        // display the job list if it is not empty
        if (postedJobs.length != 0) {
            displayPostedJobs(postedJobs);
        }
    }

});

/*

    localStorage.clear();
    localStorage.admin = JSON.stringify(currentAdmin);
    localStorage.removeItem('postedJobs');
    postedJobs.push(job1);
    postedJobs.push(job2);
    postedJobs.push(job3);
    localStorage.postedJobs = JSON.stringify(postedJobs);

    let adminJobs = [job1, job2, job3];
    localStorage.admin = JSON.stringify({
    id: 1,
    name: 'Ahmed',
    email: 'admin@gmail.com',
    password: '0000000',
    company: company1,
    postedJobs: adminJobs
    });

    // function on click of the apply button
    // 1- to store the id of the job being clicked
    // it will be used later when we display the job details of the clicked job
    // 2- go to the job details page
    function onClickApplyButton(id) {
    sessionStorage.setItem('clickedJobId', id);
    window.location.href = '../pages/JobDetails.html';
    getId = sessionStorage.clickedJobId;
    console.log(getId);

    
}

*/