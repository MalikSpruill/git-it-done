let userFormEl = document.querySelector("#user-form");
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");

let getUserRepos = function(user) {
    //api url
    let apiUrl = `https://api.github.com/users/${user}/repos`;

    // request to url
    fetch(apiUrl)
    .then(response => response.ok ? response.json().then(data => displayRepos(data,user)) : alert("Error: GitHub User Not Found"))
    .catch( error => alert("Unable to connect to GitHub: " + error),)
}

let displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
    }

    // cleaer old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (let i = 0; i < repos.length; i++) {
        //format repo name
        let repoName = `${repos[i].owner.login}/${repos[i].name}`;

        // create a container for each repo
        let repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //holds repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // Keeps up with repo status
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // checks if current repo has github issues
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = `<i class='fas fa-times status-icon icon-danger'></i>${repos[i].open_issues_count} issue(s)`;
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container 
        repoEl.appendChild(titleEl);

        //append to container
        repoEl.appendChild(statusEl);

        // appends container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}

let formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
