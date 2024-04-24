document.addEventListener('DOMContentLoaded', function () {
    const addJobForm = document.getElementById('addJobForm');

    addJobForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form data
        const jobTitle = document.getElementById('jobTitle').value;
        const jobCategory = document.getElementById('jobCategory').value;
        const jobDescription = document.getElementById('jobDescription').value;
        const location = document.getElementById('location').value;
        const jobType = document.getElementById('jobType').value;
        const jobLevel = document.getElementById('jobLevel').value;
        const salary = document.getElementById('salary').value;


        // Get existing jobs from local storage and add the new job to it
        let postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];

        // Create a new job object
        const newJob = {
            id: postedJobs == 0 ? 1 : postedJobs[postedJobs.length - 1].id + 1,
            title: jobTitle,
            category: jobCategory,
            description: jobDescription,
            type: jobType,
            level: jobLevel,
            location: location,
            salary: salary,
            admin: JSON.parse(localStorage.currentUserId),
            jobApplications: [],
        };

        // add the new job to the posted job list
        postedJobs.push(newJob);
        localStorage.setItem('postedJobs', JSON.stringify(postedJobs));

        // get the users list to search for the admin object
        let users = JSON.parse(localStorage.getItem('users'));

        // Get the current admin that post the job
        currentUserId = JSON.parse(localStorage.currentUserId);
        currentUser = users.find(user => user.id == currentUserId);
        currentUser.postedJobs.push(newJob.id);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Job added successfully");

        // Clear the form fields
        addJobForm.reset();

        // Redirect to the posted job page
        window.location.href = '../pages/posted jobs.html';
    });
});