var issueContainerEl = document.querySelector("#issues-container");

let getRepoIssues = function(repo) {
    let apiUrl = `https://api.github.com/repos/${repo}/issues?direction=asc`;

    fetch(apiUrl)
    .then(response => response.ok ? response.json().then(data => displayIssues(data)) : alert("There was a problem with your request!"));
  };
  
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

  getRepoIssues("facebook/react");
