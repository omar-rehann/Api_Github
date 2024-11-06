let enterdata = document.querySelector(".enter input");
let spanel = document.querySelector(".click");
let section = document.querySelector(".show_data");

spanel.onclick = function() {
    section.innerHTML = ''; // Clear previous data

    // Validate input
    if (enterdata.value == "" || !isNaN(enterdata.value)) {
        let el = document.createElement("div");
        el.className = "show_data";
        el.textContent = "Not valid GitHub username";
        section.appendChild(el);
        return;
    }

    // Create and send request
    let myrequest = new XMLHttpRequest();
    myrequest.open("GET", `https://api.github.com/users/${enterdata.value}`);
    myrequest.send();

    myrequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let newdata = JSON.parse(this.responseText);

            // Display the image
            let imgContainer = document.createElement("div");
            imgContainer.className = "image";
            let img = document.createElement("img");
            img.src = newdata.avatar_url || '';
            img.alt = "User Not Found";
            imgContainer.appendChild(img);
            section.appendChild(imgContainer);

            // Display the username
            let nameContainer = document.createElement("div");
            nameContainer.className = "text";
            let name = document.createElement("h4");
            name.textContent = newdata.name || "Not Found";
            nameContainer.appendChild(name);
            section.appendChild(nameContainer);

            // Display the number of repos
            let reposContainer = document.createElement("div");
            reposContainer.className = "flex";
            let reposTitle = document.createElement("h4");
            reposTitle.textContent = "Repos";
            let reposCount = document.createElement("h4");
            reposCount.textContent = `${newdata.public_repos || "Not Found"}`;
            reposContainer.appendChild(reposTitle);
            reposContainer.appendChild(reposCount);
            section.appendChild(reposContainer);

            // Display the number of followers
            let followersContainer = document.createElement("div");
            followersContainer.className = "flex";
            let followersTitle = document.createElement("h4");
            followersTitle.textContent = "Followers";
            let followersCount = document.createElement("h4");
            followersCount.textContent = `${newdata.followers || "Not Found"}`;
            followersContainer.appendChild(followersTitle);
            followersContainer.appendChild(followersCount);
            section.appendChild(followersContainer);

            // Display the number of following
            let followingContainer = document.createElement("div");
            followingContainer.className = "flex";
            let followingTitle = document.createElement("h4");
            followingTitle.textContent = "Following";
            let followingCount = document.createElement("h4");
            followingCount.textContent = `${newdata.following || "Not Found"}`;
            followingContainer.appendChild(followingTitle);
            followingContainer.appendChild(followingCount);
            section.appendChild(followingContainer);
        } else if (this.readyState == 4) {
            let el = document.createElement("div");
            el.className = "show_data";
            el.textContent = "User Not Found";
            section.appendChild(el);
        }
    };
};