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

// function to display the details of the selected job inside the form fields
function displayDetails(job) {

    document.getElementById('jobTitle').value = job.title;
    document.getElementById('jobCategory').value = job.category;
    document.getElementById('jobDescription').value = job.description;
    document.getElementById('location').value = job.location;
    document.getElementById('jobType').value = job.type;
    document.getElementById('jobLevel').value = job.level;
    document.getElementById('salary').value = job.salary;
}

document.addEventListener('DOMContentLoaded', function () {

    // get the job
    job = findJobById();

    // get its id
    jobId = job.id;

    // display its details
    displayDetails(job);

    // access the edit form to make the edit on the job details
    const editJobForm = document.getElementById('editJobForm');
    editJobForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const jobTitle = document.getElementById('jobTitle').value;
        const jobCategory = document.getElementById('jobCategory').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const location = document.getElementById('location').value;
        const jobType = document.getElementById('jobType').value;
        const jobLevel = document.getElementById('jobLevel').value;
        const salary = document.getElementById('salary').value;

        // Get existing jobs from local storage
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs'));

        // Create a new job object after the edit
        const newJob = {
            id: job.id,
            title: jobTitle,
            category: jobCategory,
            description: jobDescription,
            type: jobType,
            level: jobLevel,
            location: location,
            salary: salary,
            admin: JSON.parse(localStorage.currentUserId),
            jobApplications: job.jobApplications,
        };

        // Find the job object with the matching ID
        const jobToEdit = postedJobs.find(job => job.id == jobId);

        if (jobToEdit) {
            // Update the properties of the job object with the new data
            Object.assign(jobToEdit, newJob);
            // updated info in the local storage
            localStorage.setItem('postedJobs', JSON.stringify(postedJobs));
        } else {
            console.error('Job not found with ID:', jobId);
        }

        alert('Job Edited Successfully');

        // Clear the form fields
        editJobForm.reset();

        // Redirect to the posted job page
        window.location.href = '../pages/posted jobs.html';
    });


});
