document.addEventListener('DOMContentLoaded', function() {
    const addJobForm = document.getElementById('addJobForm');

    addJobForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data
        const jobTitle = document.getElementById('jobTitle').value;
        const companyName = document.getElementById('companyName').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const location = document.getElementById('location').value;
        const jobSummary = document.getElementById('jobSummary').value;
        const salary = document.getElementById('salary').value;

        // Create a new job object
        const newJob = {
            jobTitle: jobTitle,
            companyName: companyName,
            jobDescription: jobDescription,
            location: location,
            jobSummary: jobSummary,
            salary: salary
        };

        // Get existing jobs from local storage or initialize an empty array
        let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

        // Add the new job to the array
        jobs.push(newJob);

        // Store the updated jobs array back to local storage
        localStorage.setItem('jobs', JSON.stringify(jobs));

        // Clear the form fields
        addJobForm.reset();

        // Redirect to the job list page
        window.location.href = 'job_list.html';
    });
});
       
   
