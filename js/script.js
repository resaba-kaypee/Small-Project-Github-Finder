$(function(){
  
  $('#search-user').on('keyup', function(e){
    let username = e.target.value.replace(/\s/, "-");
    searchUser(username);
  })

  const searchUser = debounce(function(username){
    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '2cf2827ad4154bf7bca0',
        client_secret: 'c13ff6b23ef83b1d5b624ab5c24963a7c0592791'
      }
    }).done(function(user){
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '2cf2827ad4154bf7bca0',
          client_secret: 'c13ff6b23ef83b1d5b624ab5c24963a7c0592791',
          sort: 'created: asc',
          per_page: 5 
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
          <div class="card">
          <div class="card-body">
                <div class="row">
                <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
                </div>
                  <div class="col-md-3">
                  <span class="badge badge-pill badge-info">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-pill badge-success">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-pill badge-danger">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo page</a>
                  </div>
                  </div>
                  </div>
                  </div>
                  `);
                })
              })
              
              $('#profile').html(`
              <div class="card">
              <div class="card-header">${user.name}</div>
              <div class="card-body">
              <div class="row">
              <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}" alt="user avatar">
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="badge badge-pill badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-pill badge-info">Public Gist: ${user.public_gist}</span>
              <span class="badge badge-pill badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-pill badge-danger">Following: ${user.following}</span>
              <div class="line-break"></div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item">Company: ${user.compay}</li>
              <li class="list-group-item">Website: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
              </div>
              </div>
        </div>
        </div>
        <h2 class="display-4">Latest Repos</h2>
        <hr>
        <div id="repos"></div>
        `);
      })
    }, 300);
      
  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
  };
})