document.getElementById("viewProfile").addEventListener('click', () => {
    const username = document.getElementById('username').value;
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            // Check if the response status is OK (200)
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user profile');
            }
        })
        .then((userData) => {
            // Handle the user data here                    
            const profileData = document.getElementById('profileData')
            if (profileData.classList.contains('hidden')) profileData.classList.toggle('hidden');
            // hide the error board if it is visible
            const errorboard = document.getElementById('errorboard');
            if (!errorboard.classList.contains('hidden')) errorboard.classList.toggle('hidden');
            document.getElementById('avatar').src = userData.avatar_url;
            document.getElementById('fullname').innerHTML = `<b>Full Name: </b>${userData.name}`;
            document.getElementById('bio').innerHTML = `<p><b>Bio: </b>${userData.bio}</p>`;
            document.getElementById('numrepo').innerHTML = `<b>Number of repositories: </b>${userData.public_repos}`;
            document.getElementById('repo').innerHTML = `<b><a href='${userData.html_url}'><h4 class="text-3xl font-bold text-center text-blue-600 mb-6">Click to view GitHub profile</h4></a></b>`
            document.getElementById('locationdisplay').innerHTML = `<b>Location: </b>${userData.location}`;
            document.getElementById('followersdisplay').innerHTML = `<b>Followers: </b>${userData.followers}`;
            document.getElementById('followingdisplay').innerHTML = `<b>Following: </b>${userData.following}`;
            document.getElementById("usernameDisplay").innerHTML = `<b>Viewing Profile details of: ${userData.login}</b>`;
            // do the other things here
        })
        .catch((error) => {
            const profileData = document.getElementById('profileData')
            // hide the profile data list if it is being displayed
            if (!profileData.classList.contains('hidden')) profileData.classList.toggle('hidden');
            // show the error board if hidden
            const errorboard = document.getElementById('errorboard');
            if (errorboard.classList.contains('hidden')) errorboard.classList.toggle('hidden');
            errorboard.innerHTML = `<br><h4 class="text-3xl font-bold text-center text-blue-600 mb-6">Ooops an error occurred: </h4> ${error}`
        });
})