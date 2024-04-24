document.addEventListener('DOMContentLoaded', function () {

    // Add onclick event to the <a> element
    const jobListLink = document.getElementById('jobListLink');
    jobListLink.onclick = function () {
        // Update the value of isSearch in session storage to false
        sessionStorage.setItem('isSearch', false);
    };


    // add on click of the search button
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function () {
        const jobTitleInput = document.getElementById('job-title');
        const jobLevelSelect = document.getElementById('job-level');

        const jobTitle = jobTitleInput.value;
        const jobLevel = jobLevelSelect.value;

        // Store job title and job level in session storage
        sessionStorage.setItem('searchedJobTitle', jobTitle);
        sessionStorage.setItem('searchedJobLevel', jobLevel);
        sessionStorage.setItem('isSearch', true);

        window.location.href = '../pages/job_list.html';

    });

});