document.addEventListener('DOMContentLoaded', function() {
    const jobListContainer = document.getElementById('jobListContainer');

    // Retrieve job data from local storage
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Function to create HTML structure for a single job listing
    function createJobElement(job) {
        const jobContainer = document.createElement('div');
        jobContainer.classList.add('job-container');

        const jobImageDiv = document.createElement('div');
        jobImageDiv.classList.add('job-image');

        const jobImage = document.createElement('img');
        jobImage.src = job.image; // Replace 'image' with the actual key in your job object
        jobImage.width = 100; // Set width and height accordingly
        jobImage.height = 100;

        const companyName = document.createElement('p');
        companyName.textContent = job.companyName; // Replace 'companyName' with the actual key in your job object

        jobImageDiv.appendChild(jobImage);
        jobImageDiv.appendChild(companyName);

        const jobDetailsDiv = document.createElement('div');
        jobDetailsDiv.classList.add('job-details');

        const jobTitle = document.createElement('b');
        jobTitle.classList.add('job-title');
        jobTitle.textContent = job.jobTitle; // Replace 'jobTitle' with the actual key in your job object

        const applyButton = document.createElement('button');
        applyButton.classList.add('job-apply-button');
        applyButton.textContent = 'Apply';
        applyButton.addEventListener('click', function() {
            // Redirect to job details page or perform other action
            window.location.href = 'JobDetails.html';
        });

        const jobLocation = document.createElement('div');
        jobLocation.classList.add('job-location');
        jobLocation.textContent = 'Location: ' + job.location; // Replace 'location' with the actual key in your job object

        const jobDescription = document.createElement('div');
        jobDescription.textContent = job.jobDescription; // Replace 'jobDescription' with the actual key in your job object

        const jobSummary = document.createElement('p');
        jobSummary.classList.add('job-summary');
        jobSummary.textContent = 'Job Summary: ' + job.jobSummary; // Replace 'jobSummary' with the actual key in your job object

        const jobSalary = document.createElement('p');
        jobSalary.classList.add('job-salary');
        jobSalary.textContent = 'Salary: ' + job.salary; // Replace 'salary' with the actual key in your job object

        jobDetailsDiv.appendChild(jobTitle);
        jobDetailsDiv.appendChild(applyButton);
        jobDetailsDiv.appendChild(jobLocation);
        jobDetailsDiv.appendChild(document.createElement('br'));
        jobDetailsDiv.appendChild(jobDescription);
        jobDetailsDiv.appendChild(jobSummary);
        jobDetailsDiv.appendChild(jobSalary);

        jobContainer.appendChild(jobImageDiv);
        jobContainer.appendChild(jobDetailsDiv);

        return jobContainer;
    }

    // Function to display job listings
    function displayJobListings() {
        jobs.forEach(function(job) {
            const jobElement = createJobElement(job);
            jobListContainer.appendChild(jobElement);
        });
    }

    // Display job listings on page load
    displayJobListings();
});
