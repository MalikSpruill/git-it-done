let issueContainerEl = document.querySelector("#issues-container");
let limitWarningEl = document.querySelector("#limit-warning");
let repoNameEl = document.querySelector("#repo-name");

let getRepoIssues = function(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl)
    .then(response => response.ok ? response.json().then(data => {
        // sends data to be displayed
        displayIssues(data);

        // checks if api has paginated issues
        if (response.headers.get("Link")) {
            displayWarning(repo);
        }
        }) 
        : alert("There was a problem with your request!"));
  }

  let getRepoName = function () {
      let queryString = document.location.search;
      let repoName = queryString.split("=")[1];
      if (repoName) {
          getRepoIssues(repoName);
        repoNameEl.textContent = repoName;
      }
      else {
          //no repo name given, redirect to homepage
          document.location.replace("./index.html");
      }
  }
  
  let displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

    // Issue title
    let titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    let typeEl = document.createElement("span");

    // checks if issue or pull request
    if (issues[i].pull_request) {
    typeEl.textContent = "(Pull request)";
    } 
    else {
    typeEl.textContent = "(Issue)";
    }

    // append to container
    issueEl.appendChild(typeEl);
    issueContainerEl.appendChild(issueEl);
  }
}

let displayWarning = function(repo) {
    //pagination warning 
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    let linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);

}

getRepoName();